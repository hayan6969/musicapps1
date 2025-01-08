const mongoose = require('mongoose');
const moment = require('moment');
const Chat = require('../models/chat.model');
const User = require('../models/user.model');

/**
 * Chat Service: Handles chat-related business logic.
 */
const ChatService = {
  /**
   * Get chat history between two users.
   *
   * @param {string} currentUserId - ID of the logged-in user.
   * @param {string} userId - ID of the other user in the chat.
   * @returns {Promise<Object>} - Chat document containing messages.
   */
  async getChatHistory(currentUserId, userId) {
    try {
      const chat = await Chat.findOne({
        participants: { $all: [currentUserId, userId] },
      }).select('messages');

      return chat;
    } catch (error) {
      throw new Error('Unable to fetch chat history.');
    }
  },

  /**
   * Save a message in the chat between two participants.
   * Creates a new chat if it doesn't exist.
   *
   * @param {string} senderId - ID of the sender.
   * @param {string} recipientId - ID of the recipient.
   * @param {string} message - Message text.
   * @returns {Promise<Object>} - Updated chat document.
   */
  async saveMessage(senderId, recipientId, message) {
    try {
      // Check if either user has blocked the other
      const sender = await User.findById(senderId);
      const recipient = await User.findById(recipientId);

      if (sender.blockedUsers.includes(recipientId)) {
        throw new Error('You have blocked this user');
      }

      if (recipient.blockedUsers.includes(senderId)) {
        throw new Error('You have been blocked by this user');
      }

      // Convert sender and recipient IDs to ObjectId
      const senderObjectId = new mongoose.Types.ObjectId(senderId);
      const recipientObjectId = new mongoose.Types.ObjectId(recipientId);

      // Sort participants to ensure consistency
      const sortedParticipants = [senderObjectId, recipientObjectId].sort();

      // Attempt to find the chat
      let chat = await Chat.findOne({ participants: { $all: sortedParticipants } });

      if (!chat) {
        // If no chat exists, create one
        chat = new Chat({
          participants: sortedParticipants,
          messages: [
            {
              sender: senderObjectId,
              text: message,
              createdAt: new Date(),
            },
          ],
        });
      } else {
        // If chat exists, add the new message
        chat.messages.push({
          sender: senderObjectId,
          text: message,
          createdAt: new Date(),
        });
      }

      // Save the chat (whether new or updated)
      await chat.save();

      return chat;
    } catch (error) {
      throw new Error(error.message || 'Unable to save message.');
    }
  },

  /**
   * Block a user in a chat.
   *
   * @param {string} userId - ID of the user performing the block.
   * @param {string} blockedUserId - ID of the user to be blocked.
   * @returns {Promise<void>}
   */
  async blockUser(userId, blockedUserId) {
    try {
      // Add blocked user to the blocker's blockedUsers array
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { blockedUsers: blockedUserId },
        },
        { new: true }
      );

      return true;
    } catch (error) {
      throw new Error('Unable to block user.');
    }
  },

  /**
   * Report a user in a chat.
   *
   * @param {string} userId - ID of the user reporting.
   * @param {string} reportedUserId - ID of the user being reported.
   * @returns {Promise<void>}
   */
  async reportUser(userId, reportedUserId) {
    try {
      await Chat.updateMany(
        { participants: { $all: [userId, reportedUserId] } },
        { $addToSet: { reportedBy: userId } } // Add the reporting user to the `reportedBy` array
      );
    } catch (error) {
      throw new Error('Unable to report user.');
    }
  },

  /**
   * Mark all messages as read in a chat for a user.
   *
   * @param {string} chatId - ID of the chat.
   * @param {string} userId - ID of the user marking messages as read.
   * @returns {Promise<void>}
   */
  async markMessagesAsRead(chatId, userId) {
    try {
      // Update messages using MongoDB's update operator
      await Chat.findOneAndUpdate(
        { _id: chatId },
        {
          $set: {
            'messages.$[elem].read': true,
          },
        },
        {
          arrayFilters: [{ 'elem.sender': { $ne: userId }, 'elem.read': false }],
          new: true,
        }
      );
    } catch (error) {
      throw new Error('Unable to mark messages as read.');
    }
  },

  /**
   * Unblock a user in a chat.
   *
   * @param {string} userId - ID of the user performing the unblock.
   * @param {string} blockedUserId - ID of the user to be unblocked.
   * @returns {Promise<void>}
   */
  async unblockUser(userId, blockedUserId) {
    try {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { blockedUsers: blockedUserId },
        },
        { new: true }
      );
      return true;
    } catch (error) {
      throw new Error('Unable to unblock user.');
    }
  },

  /**
   * Get list of blocked users for a user.
   *
   * @param {string} userId - ID of the user.
   * @returns {Promise<Array>} - List of blocked users.
   */
  async getBlockedUsers(userId) {
    try {
      const user = await User.findById(userId).populate('blockedUsers', 'name email profilePicture');
      return user.blockedUsers;
    } catch (error) {
      throw new Error('Unable to fetch blocked users.');
    }
  },

  /**
   * Get list of users the current user has chatted with
   */
  async getChatUsers(currentUserId) {
    try {
      // Find all chats where the current user is a participant
      const chats = await Chat.find({
        participants: currentUserId,
      }).populate({
        path: 'participants',
        match: { _id: { $ne: currentUserId } }, // Exclude current user
        select: 'name profilePicture', // Add profilePicture to the selection
      });

      // Format the response to match frontend requirements
      const chatUsers = await Promise.all(
        chats.map(async (chat) => {
          const otherUser = chat.participants[0]; // Already filtered to other user
          const latestMessage = chat.messages[chat.messages.length - 1];
          const unreadCount = chat.messages.filter((msg) => !msg.read && msg.sender.toString() !== currentUserId).length;

          return {
            id: otherUser._id,
            chatId: chat._id,
            avatar: otherUser.profilePicture, // Add profilePicture as avatar
            userName: otherUser.name,
            latestMessage: latestMessage ? latestMessage.text : '',
            unreadCount,
          };
        })
      );

      return chatUsers;
    } catch (error) {
      throw new Error('Unable to fetch chat users');
    }
  },

  /**
   * Get messages for a specific chat
   */
  async getChatMessages(currentUserId, chatId) {
    try {
      const chat = await Chat.findOne({
        _id: chatId,
        participants: { $in: [currentUserId] },
      }).populate('messages.sender', 'name');

      if (!chat) {
        throw new Error('Chat not found');
      }

      // Format messages to match frontend requirements
      const formattedMessages = chat.messages.map((msg) => ({
        id: msg._id,
        senderId: msg.sender._id,
        message: msg.text,
        datetime: moment(msg.createdAt).format('HH:mm'),
        currentUser: msg.sender._id.toString() === currentUserId.toString(),
        isCard: false, // Add logic for cards if needed
        cardType: '0',
      }));

      return {
        chatId,
        detail: formattedMessages,
      };
    } catch (error) {
      throw new Error('Unable to fetch chat messages');
    }
  },

  /**
   * Send a message
   */
  async sendMessage(senderId, chatId, message) {
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        throw new Error('Chat not found');
      }

      const newMessage = {
        sender: senderId,
        text: message,
        createdAt: new Date(),
      };

      chat.messages.push(newMessage);
      await chat.save();

      // Format response to match frontend requirements
      return {
        id: newMessage._id,
        senderId,
        message: newMessage.text,
        datetime: moment(newMessage.createdAt).format('HH:mm'),
        currentUser: true,
        isCard: false,
        cardType: '0',
      };
    } catch (error) {
      throw new Error('Unable to send message');
    }
  },

  /**
   * Find or create a chat between two users
   */
  async findOrCreateChat(userId1, userId2) {
    try {
      // Sort user IDs to ensure consistent chat lookup
      const participants = [userId1, userId2].sort();

      // Try to find existing chat
      let chat = await Chat.findOne({
        participants: { $all: participants },
      });

      // If no chat exists, create one
      if (!chat) {
        chat = await Chat.create({
          participants,
          messages: [],
        });
      }

      return chat;
    } catch (error) {
      throw new Error('Unable to find or create chat');
    }
  },
};

module.exports = ChatService;
