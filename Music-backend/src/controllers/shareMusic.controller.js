const httpStatus = require('http-status');
const pick = require('../utils/pick');
const regexFilter = require('../utils/regexFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shareMusicService } = require('../services');
const mongoose = require('mongoose');
const ShareMusicAsset = require('../models/shareMusicAsset.model');

const shareAsset = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user.id,
    updatedBy: req.user.id,
    userName: req.user.name,
  };
  const shareMusicAsset = await shareMusicService.shareAsset(payload);
  res.status(httpStatus.CREATED).send(shareMusicAsset);
});

const getAssets = catchAsync(async (req, res) => {
  const result = await shareMusicService.getAssets(req.user.id);
  res.send(result);
});

const shareCreation = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user.id,
    updatedBy: req.user.id,
    userName: req.user.name,
  };
  const shareMusicCreation = await shareMusicService.shareCreation(payload);
  res.status(httpStatus.CREATED).send(shareMusicCreation);
});

const getCreation = catchAsync(async (req, res) => {
  const result = await shareMusicService.getCreation(req.user.id);
  res.send(result);
});

const getAssetDetail = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ID is required');
  }

  const result = await shareMusicService.getAssetDetail(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Asset not found');
  }

  res.status(httpStatus.OK).send(result);
});

const getCreationDetail = catchAsync(async (req, res) => {
  const creation = await shareMusicService.getCreationDetail(req.params.id);
  if (!creation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music creation not found');
  }
  res.send(creation);
});

const addComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;

  // Find the music asset
  const asset = await shareMusicService.getAssetDetail(id);
  if (!asset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music asset not found');
  }

  // Create new comment document
  const newComment = {
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    comment: comment,
    createdAt: new Date(),
  };

  // Add comment to asset
  asset.comments.push(newComment);
  await asset.save();

  // Find the added comment and populate user details
  const populatedAsset = await ShareMusicAsset.findById(id)
    .populate('comments.userId', 'name profilePicture')
    .select('comments');

  // Get the last comment (the one we just added)
  const addedComment = populatedAsset.comments[populatedAsset.comments.length - 1];

  // Create response object
  const commentResponse = {
    _id: addedComment._id,
    userId: userId,
    userName: userName,
    text: addedComment.comment,
    createdAt: addedComment.createdAt,
    profilePicture: addedComment.userId ? addedComment.userId.profilePicture : null,
  };

  res.status(httpStatus.CREATED).send({
    message: 'Comment added successfully',
    comment: commentResponse,
  });
});

const getAssetComments = catchAsync(async (req, res) => {
  const { id } = req.params;

  const asset = await ShareMusicAsset.findById(id)
    .populate({
      path: 'comments.userId',
      select: 'name profilePicture _id',
    })
    .select('comments');

  if (!asset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Music asset not found');
  }

  // Transform comments to match response format
  const transformedComments = asset.comments.map((comment) => ({
    _id: comment._id,
    userId: comment.userId._id,
    userName: comment.userId.name,
    profilePicture: comment.userId.profilePicture,
    text: comment.comment,
    createdAt: comment.createdAt,
  }));

  res.send(transformedComments);
});

module.exports = {
  shareAsset,
  getAssets,
  shareCreation,
  getCreation,
  getAssetDetail,
  getCreationDetail,
  addComment,
  getAssetComments,
};
