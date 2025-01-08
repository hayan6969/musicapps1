const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');

const router = express.Router();

// router.route('/add').post(auth('recruiters'), validate(jobValidation.postJob), jobController.postJob);
// Harrdoce agar users dapat add job
router.route('/add').post(auth('users','recruiters'),validate(jobValidation.getJobs), jobController.postJob);
router.route('/').get(validate(jobValidation.getJobs), jobController.getJobs);
router.route('/:jobId').get(auth('users'), validate(jobValidation.getJobById), jobController.getJobById);
router.route('/apply/:jobId').post(auth('users'), validate(jobValidation.applyJob), jobController.applyJob);

// New DELETE route to delete a job
router.route('/:jobId').delete(auth('recruiters'), validate(jobValidation.getJobById), jobController.deleteJob);

// New PUT route to update a job
router.route('/:jobId').put(auth('recruiters'), validate(jobValidation.getJobById), jobController.updateJob);

module.exports = router;
