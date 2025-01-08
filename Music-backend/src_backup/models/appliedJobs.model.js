const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

// musicIds: Joi.array().min(4).max(4).items(Joi.string().custom(objectId)).required(),
// message: Joi.string().required(),

const appliedJobSchema = mongoose.Schema(
  {
    musicIds: [
      {
        type: String,
        required: true,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    jobId: {
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
appliedJobSchema.plugin(toJSON);
appliedJobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const AppliedJobs = mongoose.model('AppliedJobs', appliedJobSchema);

module.exports = AppliedJobs;
