const httpStatus = require('http-status');
const { Job, AppliedJobs } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a job
 * @param {Object} body
 * @returns {Promise<Job>}
 */
const postJob = async (body) => {
  return Job.create(body);
};

/**
 * Query for music box
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryJobs = async (filter, options) => {
//   const jobs = await Job.paginate(filter, options);
//   return jobs;
// };

const queryJobs = async (filter, options, { populate, select } = {}) => {
  const { sortBy = '-createdAt', limit = 10, page = 1 } = options;

  const jobs = await Job.find(filter)
    .sort(sortBy) // Sorting berdasarkan opsi
    .skip((page - 1) * limit) // Paginasi: melewati data sesuai halaman
    .limit(limit) // Paginasi: batas data per halaman
    .populate(populate, select); // Populate untuk createdBy

  const totalDocs = await Job.countDocuments(filter);

  return {
    results: jobs,
    page,
    limit,
    totalPages: Math.ceil(totalDocs / limit),
    totalDocs,
  };
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  return Job.findById(id);
};

/**
 * Apply a job
 * @param {Object} body
 * @returns {Promise<AppliedJobs>}
 */
const applyJob = async (body) => {
  return AppliedJobs.create(body);
};

/**
 * Delete a job by id
 * @param {ObjectId} jobId
 * @returns {Promise<void>}
 */
const deleteJob = async (jobId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  // Delete the job from the database
  await job.remove();
};

/**
 * Update a job by id
 * @param {ObjectId} jobId
 * @param {Object} updateData
 * @returns {Promise<Job>}
 */
const updateJob = async (jobId, updateData) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  Object.assign(job, updateData);
  await job.save(); // Save the updated job to the database

  return job;
};

const getAppliedJobsByUser = async (userId) => {
  return AppliedJobs.find({ createdBy: userId }).populate('job'); // Populate field 'job' untuk detail pekerjaan
};

module.exports = {
  postJob,
  queryJobs,
  getJobById,
  applyJob,
  deleteJob,
  updateJob,
  getAppliedJobsByUser
};
