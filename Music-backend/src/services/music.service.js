const httpStatus = require('http-status');
const { Music, ShareMusicCreation } = require('../models');
const ApiError = require('../utils/ApiError');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { User } = require('../models');

/**
 * Create a user
 * @param {Object} musicBody
 * @returns {Promise<User>}
 */
const uploadMusic = async (musicBody) => {
  return Music.create(musicBody);
};

/**
 * Query for music box
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMusicBox = async (filter, options) => {
  const musicBox = await Music.paginate(filter, options);
  return musicBox;
};

/**
 * Get music by id
 * @param {ObjectId} id
 * @returns {Promise<Music>}
 */
const getMusicById = async (id) => {
  console.log('Attempting to find music with ID:', id);

  if (!ObjectId.isValid(id)) {
    console.log('Invalid ObjectId format');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid music ID format');
  }

  const music = await ShareMusicCreation.findById(id);
  console.log('Found music:', music);

  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  return music;
};

/**
 * Get music recommendation by music genre
 * @param {string} genre
 * @returns {Promise<Music>}
 */
const getMusicByGenre = async (filter) => {
  return Music.find(filter);
};

/**
 * Update music by id
 * @param {ObjectId} musicId
 * @param {Object} updateBody
 * @returns {Promise<Music>}
 */
const updateMusic = async (musicId, updateBody) => {
  const music = await Music.findById(musicId);
  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }

  // Apply updates to the music object
  Object.assign(music, updateBody);

  // Save the updated music document
  await music.save();

  return music;
};

const deleteMusic = async (musicId) => {
  const music = await Music.findByIdAndDelete(musicId);
  if (!music) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music not found');
  }
  return music;
};

const followUser = async (followerId, followingId) => {
  // Check if already following
  const user = await User.findById(followerId);
  if (user.following.includes(followingId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already following this user');
  }

  // Add to following array
  await User.findByIdAndUpdate(followerId, {
    $push: { following: followingId },
  });

  // Add to followers array of target user
  await User.findByIdAndUpdate(followingId, {
    $push: { followers: followerId },
  });

  return { message: 'Successfully followed user' };
};

const unfollowUser = async (followerId, followingId) => {
  // Remove from following array
  await User.findByIdAndUpdate(followerId, {
    $pull: { following: followingId },
  });

  // Remove from followers array of target user
  await User.findByIdAndUpdate(followingId, {
    $pull: { followers: followerId },
  });

  return { message: 'Successfully unfollowed user' };
};

const getFollowers = async (userId) => {
  const user = await User.findById(userId).populate('followers', 'name email');
  return user.followers;
};

const getFollowing = async (userId) => {
  const user = await User.findById(userId).populate('following', 'name email');
  return user.following;
};

module.exports = {
  uploadMusic,
  queryMusicBox,
  getMusicById,
  getMusicByGenre,
  updateMusic,
  deleteMusic,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
