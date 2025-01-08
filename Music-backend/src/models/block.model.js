const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema(
  {
    blockerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blockedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can't block another user multiple times
blockSchema.index({ blockerId: 1, blockedUserId: 1 }, { unique: true });

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;
