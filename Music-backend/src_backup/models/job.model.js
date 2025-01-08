const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

// projectTitle: Joi.string().required(),
// category: Joi.array().min(1).max(2).required().items(Joi.string()).required(),
// isHaveLyric: Joi.boolean().required(),
// lyricLanguage: Joi.string(),
// budget: Joi.string().required(),
// timeFrame: Joi.string().required(),
// preferredLocation: Joi.string(),
// desription: Joi.string().required(),

const jobSchema = mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    isHaveLyric: {
      type: Boolean,
      required: true,
    },
    lyricLanguage: {
      type: String,
    },
    budget: {
      type: String,
      required: true,
    },
    timeFrame: {
      type: String,
      required: true,
    },
    preferredLocation: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
