const express = require('express');
const auth = require('../../middlewares/auth');
const trackController = require('../../controllers/track.controller');

const router = express.Router();

router.route('/').post(auth('users'), trackController.uploadTracks);
router.route('/:trackID').get(auth('users'), trackController.playTracks);
router.route('/:trackID').delete(auth('users'), trackController.deleteTracksById);

module.exports = router;
