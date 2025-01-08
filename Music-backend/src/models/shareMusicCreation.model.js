const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const shareMusicCreationSchema = mongoose.Schema(
  {
    myRole: [
      {
        type: String,
      },
    ],
    singerName: {
      type: String,
    },
    publisher: {
      type: String,
    },
    songLanguage: {
      type: String,
    },
    musicUsage: {
      type: String,
    },
    musicStyle: {
      type: String,
    },
    musicMood: {
      type: String,
    },
    musicImage: {
      type: String,
    },
    music: {
      type: String,
    },
    musicLyric: {
      type: String,
    },
    musicPlaybackBackground: {
      type: String,
    },
    musicInstrument: {
      type: String,
    },
    tags: {
      type: String,
    },
    softwareTool: {
      type: String,
    },
    musicName: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

shareMusicCreationSchema.plugin(toJSON);
shareMusicCreationSchema.plugin(paginate);

const ShareMusicCreation = mongoose.model('ShareMusicCreation', shareMusicCreationSchema, 'sharemusiccreations');

module.exports = ShareMusicCreation;
