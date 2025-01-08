const httpStatus = require('http-status');
const { ShareMusicAsset, ShareMusicCreation } = require('../models');
const ApiError = require('../utils/ApiError');

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

module.exports = {
  shareAsset,
  getAssets,
  shareCreation,
  getCreation,
};
