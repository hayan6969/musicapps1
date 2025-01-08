const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const shareMusicValidation = require('../../validations/shareMusic.validation');
const shareMusicController = require('../../controllers/shareMusic.controller');

const router = express.Router();

router.route('/').post(auth('users'), validate(shareMusicValidation.shareAsset), shareMusicController.shareAsset);
router.route('/').get(auth('users'), validate(shareMusicValidation.getAssets), shareMusicController.getAssets);


module.exports = router;
