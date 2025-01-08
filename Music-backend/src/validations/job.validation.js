const Joi = require('joi');
const { objectId } = require('./custom.validation');

const postJob = {
  // body: Joi.object().keys({
  //   publisherName: Joi.string().required(),
  //   projectTitle: Joi.string().required(),
  //   category: Joi.array().items(Joi.string()).min(1).max(5).required(),
  //   isHaveLyric: Joi.boolean().required(),
  //   lyricLanguage: Joi.string(),
  //   budget: Joi.string().required(),
  //   timeFrame: Joi.string().required(),
  //   preferredLocation: Joi.string(),
  //   description: Joi.string().required(),
  //   applicantName: Joi.string().required(),
  //   applicantAvatar: Joi.string().uri().optional(),
  //   applicantBackgroundImage: Joi.string().uri().optional(),
  //   applicantSelectedSongs: Joi.array().items(Joi.string().custom(objectId)).min(0).max(2),
  //   createdBy: Joi.string(),
  // }),
  body: Joi.object().keys({
    publisherName: Joi.string().required(),
    projectTitle: Joi.string().required(),
    category: Joi.array().items(Joi.string()).min(1).max(5).required(),
    isHaveLyric: Joi.boolean().required(),
    lyricLanguage: Joi.string().optional(), // Ubah dari 'lyricLanguage' agar cocok dengan frontend
    musicUse: Joi.array().items(Joi.string()).optional(), // Tambahkan ini
    cultureArea: Joi.array().items(Joi.string()).optional(), // Tambahkan ini
    budget: Joi.string().required(),
    timeFrame: Joi.string().required(),
    preferredLocation: Joi.string().optional(),
    description: Joi.string().required(),
    applicantName: Joi.string().required(),
    applicantAvatar: Joi.string().uri().optional(),
    applicantBackgroundImage: Joi.string().uri().optional(),
    applicantSelectedSongs: Joi.array().items(Joi.string().custom(objectId)).min(0).max(2),
    createdBy: Joi.string().optional(),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    projectTitle: Joi.string(),
    preferredLocation: Joi.string(),
    category: Joi.array().items(Joi.string()),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJobById = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId).required(),
  }),
};

const applyJob = {
  params: Joi.object().keys({
    jobId: Joi.string().required()
  }),
  body: Joi.object().keys({
    musicIds: Joi.array().items(Joi.string()).required(),
    message: Joi.string().required()
  })
};

module.exports = {
  postJob,
  getJobs,
  getJobById,
  applyJob,
};
