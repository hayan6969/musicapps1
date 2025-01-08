const express = require('express');
const auth = require('../../middlewares/auth');
const uploadController = require('../../controllers/upload.controller');
const { uploadDynamic } = require('../../middlewares/upload');

const router = express.Router();

router.route('/profile').post(auth('users'), uploadDynamic.single('profilePicture'), uploadController.uploadImage);
router.route('/music-image').post(auth('users'), uploadDynamic.single('musicImage'), uploadController.uploadImage);
router.route('/music-background').post(auth('users'), uploadDynamic.single('musicBackground'), uploadController.uploadImage);

module.exports = router;
