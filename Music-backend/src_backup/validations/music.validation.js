const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadMusicValidation = {
  body: Joi.object().keys({
    songName: Joi.string().required(),
    uploaderRole: Joi.array().items(Joi.string().valid('composer', 'lyricist', 'arranger', 'producer')).required(),
    singerName: Joi.string(),
    publisher: Joi.string(),
    publishTime: Joi.date(),
    songLanguage: Joi.string(),
    musicCulturalRegion: Joi.string().required(),
    musicUsage: Joi.string().required(),
    musicStyle: Joi.string().required(),
    filmGenre: Joi.string(),
    gameGenre: Joi.string(),
    musicLyric: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    describe: Joi.string(),
    softwareTool: Joi.string(),
    musicInstrument:Joi.array().items(Joi.string()),
  }),
};

const getMusicBox = {
  query: Joi.object().keys({
    songName: Joi.string(),
    singerName: Joi.string(),
    userName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const commentMusic = {
  body: Joi.object().keys({
    comment: Joi.string().min(1).max(500).required().messages({
      'string.min': 'Comment must be at least 1 character long',
      'string.max': 'Comment must not exceed 500 characters',
    }),
  }),
};

module.exports = {
  uploadMusicValidation,
  getMusicBox,
  commentMusic
};
