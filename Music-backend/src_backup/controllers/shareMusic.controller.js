const httpStatus = require('http-status');
const pick = require('../utils/pick');
const regexFilter = require('../utils/regexFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shareMusicService } = require('../services');

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

module.exports = {
  shareAsset,
  getAssets,
  shareCreation,
  getCreation,
};
