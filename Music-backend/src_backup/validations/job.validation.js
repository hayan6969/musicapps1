const Joi = require('joi');
const { objectId } = require('./custom.validation');

const postJob = {
  body: Joi.object().keys({
    projectTitle: Joi.string().required(),
    category: Joi.array().min(1).max(2).items(Joi.string()).required(),
    isHaveLyric: Joi.boolean().required(),
    lyricLanguage: Joi.string(),
    budget: Joi.string().required(),
    timeFrame: Joi.string().required(),
    preferredLocation: Joi.string(),
    description: Joi.string().required(),
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
    jobId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    musicIds: Joi.array().min(4).max(4).items(Joi.string().custom(objectId)).required(),
    message: Joi.string().required(),
  }),
};

module.exports = {
  postJob,
  getJobs,
  getJobById,
  applyJob,
};
