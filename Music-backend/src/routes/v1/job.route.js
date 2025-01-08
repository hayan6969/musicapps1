const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');
const upload = require('../../config/multer');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

// Separate route for uploading images
router.route('/upload-images').post(
  auth('recruiters'),
  upload.fields([
    { name: 'applicantAvatar', maxCount: 1 },
    { name: 'applicantBackgroundImage', maxCount: 1 },
  ]),
  catchAsync(async (req, res) => {
    // Handle image upload and respond
    console.log('Req.files:', req.files);
    const avatarPath = req.files['applicantAvatar'] ? `/uploads/${req.files['applicantAvatar'][0].filename}` : null;
    const backgroundImagePath = req.files['applicantBackgroundImage']
      ? `/uploads/${req.files['applicantBackgroundImage'][0].filename}`
      : null;

    if (!avatarPath && !backgroundImagePath) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    return res.status(200).json({
      message: 'Files uploaded successfully',
      avatar: avatarPath,
      backgroundImage: backgroundImagePath,
    });
  })
);

router.route('/add').post(auth('recruiters'), validate(jobValidation.postJob), jobController.postJob);

router.route('/').get(validate(jobValidation.getJobs), jobController.getJobs);
router.route('/:jobId').get(auth('users'), validate(jobValidation.getJobById), jobController.getJobById);
router.route('/apply/:jobId').post(auth('users'), validate(jobValidation.applyJob), jobController.applyJob);

//Route meliah list job yang sudah di apply
router.route('/applied-jobs').get(auth('users'), jobController.getAppliedJobs);

// New DELETE route to delete a job
router.route('/:jobId').delete(auth('recruiters'), validate(jobValidation.getJobById), jobController.deleteJob);

// New PUT route to update a job
router.route('/:jobId').put(auth('recruiters'), validate(jobValidation.getJobById), jobController.updateJob);

module.exports = router;
