const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const musicValidation = require('../../validations/music.validation');
const musicController = require('../../controllers/music.controller');
const recommendationController = require('../../controllers/recommendation.controller');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = `./public/uploads/${req.user.id}`;
        fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

router.route('/upload').post(auth('users'),
    upload.fields([
        { name: 'musicImage', maxCount: 1 },
        { name: 'musicAudio', maxCount: 1 },
        { name: 'musicBackground', maxCount: 1 }
    ]),
    validate(musicValidation.uploadMusic),
    musicController.uploadMusic
);
router.route('/small-box').get(auth('users'), validate(musicValidation.getMusicBox), musicController.getMusicBox);
router.route('/pop-up-page/:musicId').get(auth('users'), musicController.getPopUpPage);
router.route('/delete-music/:musicId').delete(auth('users'), musicController.deleteMusic);
router.route('/update-music/:musicId').put(
    auth('users'),  
    upload.fields([  
      { name: 'musicImage', maxCount: 1 },
      { name: 'musicAudio', maxCount: 1 },
      { name: 'musicBackground', maxCount: 1 }
    ]),
    musicController.updateMusic  
);

// Routes for like and comment functionality
router.route('/like/:musicId').post(auth('users'), musicController.likeMusic);
router.route('/comment/:musicId').post(auth('users'), validate(musicValidation.commentMusic), musicController.commentOnMusic);
router.route('/foryou').get(auth('users'), recommendationController.getRecommendations);
router.route('/rating/:musicId').post(auth('users'), musicController.addRating);
router.route('/liked-songs')
  .get(auth('users'), musicController.getLikedSongs);
  
module.exports = router;
