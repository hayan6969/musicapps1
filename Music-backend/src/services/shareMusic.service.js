const httpStatus = require('http-status');
const { ShareMusicAsset, ShareMusicCreation } = require('../models');
const ApiError = require('../utils/ApiError');
const { ObjectId } = require('mongodb');

/**
 * Create a music asset
 * @param {Object} body
 * @returns {Promise<Job>}
 */
const shareAsset = async (body) => {
  return ShareMusicAsset.create(body);
};

/**
 * Get Music Assets by userId
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getAssets = async (createdBy) => {
  return ShareMusicAsset.find({ createdBy });
};
/**
 * Create a music creation
 * @param {Object} body
 * @returns {Promise<Job>}
 */
const shareCreation = async (body) => {
  return ShareMusicCreation.create(body);
};

/**
 * Get Music Assets by userId
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getCreation = async (createdBy) => {
  return ShareMusicCreation.find({ createdBy });
};

const getAssetDetail = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID format');
  }

  const asset = await ShareMusicAsset.findById(id);
  if (!asset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Asset not found');
  }

  return asset;
};

const getCreationDetail = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID format');
  }
  return ShareMusicCreation.findById(id);
};

const addComment = async (assetId, userId, comment) => {
  if (!ObjectId.isValid(assetId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid asset ID format');
  }

  const asset = await ShareMusicAsset.findById(assetId);
  if (!asset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Asset not found');
  }

  const result = await ShareMusicAsset.findByIdAndUpdate(
    assetId,
    {
      $push: {
        comments: {
          userId,
          comment,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );

  return result;
};

module.exports = {
  shareAsset,
  getAssets,
  shareCreation,
  getCreation,
  getAssetDetail,
  getCreationDetail,
  addComment,
};
