const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const shareMusicValidation = require('../../validations/shareMusic.validation');
const shareMusicController = require('../../controllers/shareMusic.controller');

const router = express.Router();

router.route('/').post(auth('users'), validate(shareMusicValidation.shareCreation), shareMusicController.shareCreation);
router.route('/').get(auth('users'), validate(shareMusicValidation.getCreation), shareMusicController.getCreation);
router.route('/:id').get(auth('users'), shareMusicController.getCreationDetail);

module.exports = router;
