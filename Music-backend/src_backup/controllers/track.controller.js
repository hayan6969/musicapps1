const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');
const { Readable } = require('stream');
const { trackService } = require('../services');

const uploadTracks = catchAsync(async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 10000000, files: 1, parts: 2 },
  });

  upload.single('track')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    let trackName = req.file.originalname;

    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(__databaseMongo, {
      bucketName: 'tracks',
    });

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', (err) => {
      console.log(err);
      return res.status(500).json({ message: 'Error uploading file' });
    });

    uploadStream.on('finish', () => {
      return res.status(201).json({
        message: 'File uploaded successfully, stored under Mongo ObjectID: ' + id,
        data: id,
      });
    });
  });
});

const playTracks = catchAsync(async (req, res) => {
  try {
    var trackID = new ObjectId(req.params.trackID);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters',
    });
  }
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(__databaseMongo, {
    bucketName: 'tracks',
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});

const deleteTracksById = catchAsync(async (req, res) => {
  await trackService.deleteTracksById(req.params.trackID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  uploadTracks,
  playTracks,
  deleteTracksById,
};
