const httpStatus = require('http-status');
const pick = require('../utils/pick');
const regexFilter = require('../utils/regexFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService, musicService } = require('../services');
//const upload = require('../config/multer');

const postJob = catchAsync(async (req, res) => {
  console.log('Req.body in application post job:', req.body);
  const avatarPath = req.body.applicantAvatar || null;
  const backgroundImagePath = req.body.applicantBackgroundImage || null;

  const createdBy = req.user.id;

  // Prepare payload for job creation
  const payload = {
    ...req.body,
    createdBy,
    avatar: avatarPath,
    backgroundImage: backgroundImagePath,
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
// const getJobs = catchAsync(async (req, res) => {
//   // Ambil filter berdasarkan query
//   const likeFilter = regexFilter(req.query, ['projectTitle']);
//   const pickFilter = pick(req.query, ['preferredLocation', 'category']);

//   // Tangani filter kategori
//   const categoryFilter = Array.isArray(pickFilter.category)
//     ? pickFilter.category
//     : pickFilter.category
//     ? [pickFilter.category]
//     : [];

//   // Buat filter gabungan
//   const filter = {
//     ...likeFilter,
//     ...pickFilter,
//     category: categoryFilter.length > 0 ? { $in: categoryFilter } : undefined,
//   };

//   // Hapus filter kosong
//   Object.keys(filter).forEach((key) => {
//     if (!filter[key]) {
//       delete filter[key];
//     }
//   });

//   // Jika filter kosong, ambil semua data
//   const finalFilter = Object.keys(filter).length > 0 ? filter : {};

//   // Ambil opsi untuk pagination dan sorting
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);

//   // Query data dari jobService
//   const result = await jobService.queryJobs(finalFilter, options);

//   // Kirim hasil
//   res.send(result);
// });
const getJobs = catchAsync(async (req, res) => {
  const likeFilter = regexFilter(req.query, ['projectTitle']);
  const pickFilter = pick(req.query, ['preferredLocation', 'category']);

  const categoryFilter = Array.isArray(pickFilter.category)
    ? pickFilter.category
    : pickFilter.category
    ? [pickFilter.category]
    : [];

  const filter = {
    ...likeFilter,
    ...pickFilter,
    category: categoryFilter.length > 0 ? { $in: categoryFilter } : undefined,
  };

  Object.keys(filter).forEach((key) => {
    if (!filter[key]) {
      delete filter[key];
    }
  });

  const finalFilter = Object.keys(filter).length > 0 ? filter : {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  // Memanggil queryJobs dengan populate untuk 'createdBy'
  const result = await jobService.queryJobs(finalFilter, options, {
    populate: 'createdBy', // Field yang ingin di-populate
    select: 'name profilePicture', // Field yang ingin diambil dari User
  });

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
  const { jobId } = req.params;
  const { musicIds, message } = req.body;

  // First validate that all music IDs exist
  // for (const musicId of musicIds) {
  //   const music = await musicService.getMusicById(musicId);
  //   if (!music) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'There is some Music that cannot be found');
  //   }
  // }

  const result = await jobService.applyJob({
    jobId,
    musicIds,
    message,
    createdBy: req.user.id,
    userId: req.user.id,
  });

  res.status(httpStatus.CREATED).send(result);
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

const getAppliedJobs = catchAsync(async (req, res) => {
  const userId = req.user.id; // Ambil user ID dari token autentikasi
  const appliedJobs = await jobService.getAppliedJobsByUser(userId); // Panggil logika di jobService
  res.status(httpStatus.OK).send(appliedJobs);
});

module.exports = {
  postJob,
  getJobs,
  getJobById,
  applyJob,
  deleteJob,
  updateJob,
  getAppliedJobs,
};
