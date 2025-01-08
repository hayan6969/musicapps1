const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  blockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Ensure uniqueness of participants set (ignoring order)
ChatSchema.index({ participants: 1 }, { unique: true });

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
