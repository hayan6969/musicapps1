const express = require('express');

const router = express.Router();
const chatController = require('../../controllers/chat.controller');
const auth = require('../../middlewares/auth');

// Fetch chat history between two users
router.get('/history/:userId', auth('users'), chatController.getChatHistory);

// Block a user
router.post('/block', auth('users'), chatController.blockUser);

// Report a user
router.post('/report', auth('users'), chatController.reportUser);

// Save a chat message
router.post('/message', auth('users'), chatController.saveMessage);

// Get list of users the current user has chatted with
router.get('/users', auth('users'), chatController.getChatUsers);

// Get messages for a specific chat
router.get('/:chatId/messages', auth('users'), chatController.getChatMessages);

// Send a message
router.post('/:chatId/messages', auth('users'), chatController.sendMessage);

// Get chat room
router.get('/room/:userId', auth('users'), chatController.getChatRoom);

module.exports = router;
