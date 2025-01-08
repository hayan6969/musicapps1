const httpStatus = require('http-status');
const pick = require('../utils/pick');
const regexFilter = require('../utils/regexFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService, musicService } = require('../services');

const postJob = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user.id,
  };
  const job = await jobService.postJob(payload);
  res.status(httpStatus.CREATED).send(job);
});

// const getJobs = catchAsync(async (req, res) => {
//   const likeFilter = regexFilter(req.query, ['projectTitle']);
//   const pickFilter = pick(req.query, ['preferredLocation', 'category']);

//   const categoryFilter = Array.isArray(pickFilter.category) ? pickFilter.category : [];

//   const filter = {
//     ...likeFilter,
//     ...pickFilter,
//     category: categoryFilter.length > 0 ? { $in: categoryFilter } : undefined,
//   };

//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await jobService.queryJobs(filter, options);
//   res.send(result);
// });

// Penyesuaian getJob jika filter kosong data tetap di tampilkan
const getJobs = catchAsync(async (req, res) => {
  // Ambil filter berdasarkan query
  const likeFilter = regexFilter(req.query, ['projectTitle']);
  const pickFilter = pick(req.query, ['preferredLocation', 'category']);

  // Tangani filter kategori
  const categoryFilter = Array.isArray(pickFilter.category) ? pickFilter.category : (pickFilter.category ? [pickFilter.category] : []);

  // Buat filter gabungan
  const filter = {
    ...likeFilter,
    ...pickFilter,
    category: categoryFilter.length > 0 ? { $in: categoryFilter } : undefined,
  };

  // Hapus filter kosong
  Object.keys(filter).forEach((key) => {
    if (!filter[key]) {
      delete filter[key];
    }
  });

  // Jika filter kosong, ambil semua data
  const finalFilter = Object.keys(filter).length > 0 ? filter : {};

  // Ambil opsi untuk pagination dan sorting
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  // Query data dari jobService
  const result = await jobService.queryJobs(finalFilter, options);

  // Kirim hasil
  res.send(result);
});


const getJobById = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const applyJob = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    jobId: req.params.jobId,
    createdBy: req.user.id,
  };
  for (const musicId of payload.musicIds) {
    let music = await musicService.getMusicById(musicId);
    if (!music) {
      throw new ApiError(httpStatus.NOT_FOUND, 'There is some Music that cannot be found');
    }
  }
  const appliedJob = await jobService.applyJob(payload);
  res.status(httpStatus.CREATED).send(appliedJob);
});

const deleteJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const job = await jobService.getJobById(jobId);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  if (job.createdBy.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this job');
  }

  // Delete the job
  await jobService.deleteJob(jobId);

  res.status(httpStatus.OK).send({ message: 'Job deleted successfully' });
});

const updateJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const updateData = req.body;

  const job = await jobService.getJobById(jobId);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  if (job.createdBy.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this job');
  }

  // Update the job
  const updatedJob = await jobService.updateJob(jobId, updateData);

  res.status(httpStatus.OK).send({ message: 'Job updated successfully', job: updatedJob });
});

module.exports = {
  postJob,
  getJobs,
  getJobById,
  applyJob,
  deleteJob,
  updateJob
};
