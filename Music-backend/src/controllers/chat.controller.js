const ChatService = require('../services/chat.service'); // Import ChatService

const getChatHistory = async (req, res) => {
  const { userId } = req.params; // ID of the other user in the chat
  const currentUserId = req.user.id; // Get ID from authenticated user

  try {
    const chat = await ChatService.getChatHistory(currentUserId, userId); // Use ChatService

    if (!chat) {
      return res.status(404).json({ success: false, message: 'No chat history found' });
    }

    res.status(200).json({ success: true, data: chat.messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const blockUser = async (req, res) => {
  const { userId, blockedUserId } = req.body;

  try {
    await ChatService.blockUser(userId, blockedUserId); // Use ChatService to block user
    res.status(200).send({ success: true, message: 'User blocked successfully.' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to block user.', error: error.message });
  }
};

const reportUser = async (req, res) => {
  const { userId, reportedUserId } = req.body;

  try {
    await ChatService.reportUser(userId, reportedUserId); // Use ChatService to report user
    res.status(200).send({ success: true, message: 'User reported successfully.' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to report user.', error: error.message });
  }
};

const saveMessage = async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  try {
    const chat = await ChatService.saveMessage(senderId, recipientId, message);
    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get list of users the current user has chatted with
 */
const getChatUsers = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const chatUsers = await ChatService.getChatUsers(currentUserId);
    res.status(200).json(chatUsers);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get messages for a specific chat
 */
const getChatMessages = async (req, res) => {
  const { chatId } = req.params;
  const currentUserId = req.user.id;

  try {
    const messages = await ChatService.getChatMessages(currentUserId, chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Send a message
 */
const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;
  const currentUserId = req.user.id;

  try {
    const newMessage = await ChatService.sendMessage(currentUserId, chatId, message);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get or create chat room between current user and another user
 */
const getChatRoom = async (req, res) => {
  const { userId } = req.params; // ID of the other user
  const currentUserId = req.user.id;

  try {
    const chat = await ChatService.findOrCreateChat(currentUserId, userId);
    res.status(200).json({
      success: true,
      chatId: chat._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getChatHistory,
  blockUser,
  reportUser,
  saveMessage,
  getChatUsers,
  getChatMessages,
  sendMessage,
  getChatRoom,
};
