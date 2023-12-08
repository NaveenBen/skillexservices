const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const bcrypt = require('bcryptjs');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  let hash = user.passwordHash;
  if (!hash) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (!bcrypt.compareSync(password, hash)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};
module.exports = {
  loginUserWithEmailAndPassword,
  refreshAuth,
};
