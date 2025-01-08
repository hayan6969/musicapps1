const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  console.log('userRights in auth:', user?.role); // Log role user untuk debugging
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    console.log('requiredRights in auth:', requiredRights);
    console.log('userRights:', userRights);
    console.log('hasRequiredRights:', hasRequiredRights);

    // Validasi hanya jika `userId` atau `jobId` ada di route
    if (
      !hasRequiredRights &&
      ((req.params.userId && req.params.userId !== user.id) ||
        (req.params.jobId && req.params.jobId !== user.id)) &&
      (req.params.jobId !== undefined || req.params.userId !== undefined)
    ) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    console.log('requiredRights:', requiredRights); // Log requiredRights untuk debugging
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
