const httpStatus = require('http-status');
const pick = require('../utils/pick');
const regexFilter = require('../utils/regexFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { musicService } = require('../services');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const { Music, ShareMusicCreation } = require('../models');
const User = require('../models/user.model'); // Import User model
const mongoose = require('mongoose');

const uploadMusic = catchAsync(async (req, res) => {
  // Prepare payload for music metadata
  const payload = {
    ...req.body,
    createdBy: req.user.id,
    userName: req.user.name,
    musicImage: req.files['musicImage'] ? req.files['musicImage'][0].path : null,
    musicAudio: req.files['musicAudio'] ? req.files['musicAudio'][0].path : null,
    musicBackground: req.files['musicBackground'] ? req.files['musicBackground'][0].path : null,
  };

  const music = await musicService.uploadMusic(payload);

  if (music) {
    const directory = `./public/uploads/${req.user.id}`;

    fs.readdirSync(directory).forEach(async (file) => {
      let extFile = file.split('.').pop();
      let currentFilename = file.split('.').shift();

      if (req.body.musicImage === currentFilename) {
        // Rename the image file with music id
        fs.rename(`${directory}/${file}`, `${directory}/${currentFilename}-${music.id}.${extFile}`, (err) => {
          if (err) console.log('Error Renaming Image File', err);
        });

        const updateImage = {
          musicImage: `${currentFilename}-${music.id}.${extFile}`,
        };
        await musicService.updateMusic(music.id, updateImage);
      }

      if (req.body.musicBackground === currentFilename) {
        // Rename the background image file with music id
        fs.rename(`${directory}/${file}`, `${directory}/${currentFilename}-${music.id}.${extFile}`, (err) => {
          if (err) console.log('Error Renaming Background File', err);
        });

        const updateBackground = {
          musicBackground: `${currentFilename}-${music.id}.${extFile}`,
        };
        await musicService.updateMusic(music.id, updateBackground);
      }
    });
  }

  // Send the response back
  res.status(httpStatus.CREATED).send(music);
});

const getMusicBox = catchAsync(async (req, res) => {
  const filter = regexFilter(req.query, ['songName', 'singerName', 'userName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await musicService.queryMusicBox(filter, options);
  res.send(result);
});

const getPopUpPage = catchAsync(async (req, res) => {
  console.log('req.params.musicId:', req.params.musicId);
  const music = await musicService.getMusicById(req.params.musicId);
  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }
  const filter = {
    musicStyle: music.musicStyle,
    _id: { $ne: new ObjectId(music.id) },
  };
  const recommendation = await musicService.getMusicByGenre(filter);
  res.send({
    music: music,
    recommendation: recommendation,
  });
});

const deleteMusic = catchAsync(async (req, res) => {
  const { musicId } = req.params;

  const music = await musicService.getMusicById(musicId);

  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  const directory = `./public/uploads/${req.user.id}`;

  if (music.musicImage) {
    const imagePath = `${directory}/${music.musicImage}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  if (music.musicAudio) {
    const audioPath = `${directory}/${music.musicAudio}`;
    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }
  }

  if (music.musicBackground) {
    const backgroundPath = `${directory}/${music.musicBackground}`;
    if (fs.existsSync(backgroundPath)) {
      fs.unlinkSync(backgroundPath);
    }
  }

  await musicService.deleteMusic(musicId);

  res.status(httpStatus.OK).send({
    message: 'Music deleted successfully', // Success message
  });
});

const updateMusic = catchAsync(async (req, res) => {
  const { musicId } = req.params;

  const music = await musicService.getMusicById(musicId);
  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  const updateData = { ...req.body };

  const directory = `./public/uploads/${req.user.id}`;

  if (req.files['musicImage']) {
    if (music.musicImage) {
      const oldImagePath = `${directory}/${music.musicImage}`;
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    updateData.musicImage = req.files['musicImage'][0].path;
  }

  if (req.files['musicAudio']) {
    if (music.musicAudio) {
      const oldAudioPath = `${directory}/${music.musicAudio}`;
      if (fs.existsSync(oldAudioPath)) {
        fs.unlinkSync(oldAudioPath);
      }
    }
    updateData.musicAudio = req.files['musicAudio'][0].path;
  }

  if (req.files['musicBackground']) {
    if (music.musicBackground) {
      const oldBackgroundPath = `${directory}/${music.musicBackground}`;
      if (fs.existsSync(oldBackgroundPath)) {
        fs.unlinkSync(oldBackgroundPath);
      }
    }
    updateData.musicBackground = req.files['musicBackground'][0].path;
  }

  const updatedMusic = await musicService.updateMusic(musicId, updateData);

  res.status(httpStatus.OK).send(updatedMusic);
});

const likeMusic = catchAsync(async (req, res) => {
  const { musicId } = req.params;
  const userId = req.user.id;

  console.log('Attempting to like music with ID:', musicId);
  console.log('User ID:', userId);

  const music = await musicService.getMusicById(musicId);
  console.log('Found music:', music);

  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  // Check if user already liked the music
  const existingLike = music.likes.find((like) => like.userId.toString() === userId);

  if (existingLike) {
    // Unlike: Remove the like
    music.likes = music.likes.filter((like) => like.userId.toString() !== userId);
  } else {
    // Like: Add new like
    music.likes.push({ userId, createdAt: new Date() });
  }

  await music.save();

  res.status(httpStatus.OK).send({
    message: existingLike ? 'Music unliked successfully' : 'Music liked successfully',
    likesCount: music.likes.length,
    isLiked: !existingLike,
  });
});

module.exports = { likeMusic };

const commentOnMusic = catchAsync(async (req, res) => {
  const { musicId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;

  // First find the music using the correct model
  const music = await musicService.getMusicById(musicId);
  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  // Create new comment document matching the existing schema
  const newComment = {
    _id: new mongoose.Types.ObjectId(),
    userId: userId, // This matches the schema
    comment: comment, // This matches the schema
    createdAt: new Date(),
  };

  // Add comment to music
  music.comments.push(newComment);
  await music.save();

  // Find the added comment and populate user details
  const populatedMusic = await ShareMusicCreation.findById(musicId)
    .populate('comments.userId', 'name profilePicture') // Changed to userId to match schema
    .select('comments');

  // Get the last comment (the one we just added)
  const addedComment = populatedMusic.comments[populatedMusic.comments.length - 1];

  // Create response object
  const commentResponse = {
    _id: addedComment._id,
    userId: userId,
    userName: userName,
    text: addedComment.comment, // Use comment field from schema
    createdAt: addedComment.createdAt,
    profilePicture: addedComment.userId ? addedComment.userId.profilePicture : null, // Changed to userId
  };

  res.status(httpStatus.CREATED).send({
    message: 'Comment added successfully',
    comment: commentResponse,
  });
});

const addRating = async (req, res) => {
  const { musicId } = req.params; // Get musicId from URL parameter
  const { rating } = req.body; // Get rating from request body
  const userId = req.user.id; // Assuming user authentication has been done and user ID is available

  console.log('Rating value:', rating);
  // Validate the rating
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Convert musicId to ObjectId before querying
    const music = await musicService.getMusicById(musicId);

    console.log('musicId:', musicId);
    console.log('music:', music);
    if (!music) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const existingRating = music.ratings.find((r) => r.userId.toString() === userId);

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.createdAt = Date.now(); // Update the timestamp
    } else {
      music.ratings.push({ userId, rating });
    }

    // Save the updated music document
    await music.save();

    const averageRating = music.calculateAverageRating();

    res.status(200).json({
      message: 'Rating added successfully',
      averageRating,
      ratings: music.ratings, // Return the updated list of ratings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while adding rating' });
  }
};

const getLikedSongs = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // Find the current user and populate the liked songs
    const currentUser = await User.findById(currentUserId)
      .populate('likedSongs', 'songName singerName') // Populate liked songs with specific fields
      .select('name email'); // Return user fields like name and email

    console.log('Current user:', currentUser);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user has no liked songs, return an empty array
    if (!currentUser.likedSongs || currentUser.likedSongs.length === 0) {
      return res.status(200).json({ likedSongs: [] });
    }

    // Return the list of liked songs
    res.status(200).json({
      likedSongs: currentUser.likedSongs, // This will include populated songName, singerName, etc.
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching liked songs' });
  }
};

const debugFindMusic = catchAsync(async (req, res) => {
  const { musicId } = req.params;
  console.log('Searching for music:', musicId);

  // Get database connection info
  const dbName = mongoose.connection.name;
  const collections = await mongoose.connection.db.collections();

  // Find the exact music
  const exactMusic = await Music.findById(musicId);
  console.log('Exact match:', exactMusic);

  // Find all music to verify collection
  const allMusic = await Music.find({});
  console.log('Database name:', dbName);
  console.log(
    'Collections:',
    collections.map((c) => c.collectionName)
  );
  console.log('Total music count:', allMusic.length);
  console.log(
    'All music IDs:',
    allMusic.map((m) => m._id.toString())
  );

  // Try direct MongoDB query
  const directResult = await mongoose.connection.db.collection('musics').findOne({ _id: new ObjectId(musicId) });
  console.log('Direct MongoDB query result:', directResult);

  res.send({
    databaseInfo: {
      name: dbName,
      collections: collections.map((c) => c.collectionName),
    },
    exactMatch: exactMusic,
    directMatch: directResult,
    allMusicCount: allMusic.length,
    allMusicIds: allMusic.map((m) => m._id.toString()),
  });
});

const getMusicComments = catchAsync(async (req, res) => {
  const { musicId } = req.params;

  const music = await ShareMusicCreation.findById(musicId)
    .populate({
      path: 'comments.userId',
      select: 'name profilePicture _id',
    })
    .select('comments');

  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  // Transform comments to match response format
  const transformedComments = music.comments.map((comment) => ({
    _id: comment._id,
    userId: comment.userId._id,
    userName: comment.userId.name,
    profilePicture: comment.userId.profilePicture,
    text: comment.comment,
    createdAt: comment.createdAt,
  }));

  res.send(transformedComments);
});

const followUser = catchAsync(async (req, res) => {
  const result = await musicService.followUser(req.user.id, req.params.userId);
  res.status(httpStatus.OK).send(result);
});

const unfollowUser = catchAsync(async (req, res) => {
  const result = await musicService.unfollowUser(req.user.id, req.params.userId);
  res.status(httpStatus.OK).send(result);
});

const getFollowers = catchAsync(async (req, res) => {
  const followers = await musicService.getFollowers(req.user.id);
  res.send(followers);
});

const getFollowing = catchAsync(async (req, res) => {
  const following = await musicService.getFollowing(req.user.id);
  res.send(following);
});

module.exports = {
  uploadMusic,
  getMusicBox,
  getPopUpPage,
  deleteMusic,
  updateMusic,
  commentOnMusic,
  likeMusic,
  addRating,
  getLikedSongs,
  debugFindMusic,
  getMusicComments,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
