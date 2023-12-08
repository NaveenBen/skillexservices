const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  let user = await User.findAll({ where: { email: userBody.email } });
  if (user.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  userBody.passwordHash = bcrypt.hashSync(userBody.password, 8);
  await User.create(userBody);
  user = await User.findAll({ where: { email: userBody.email } });
  if (user.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating user');
  }
  return user[0].dataValues;

};

/**
 * Query for users
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (options) => {
  const users = await User.findAll();
  return users.map(user => user.dataValues);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findAll({ where: { id } });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user[0].dataValues;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  const user = await User.findAll({ where: { email } });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user[0].dataValues;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  let user = await getUserById(userId);
  if (updateBody.email) {
    let user = await User.findAll({ where: { email: updateBody.email } });
    if (user.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }
  if (updateBody.password) {
    updateBody.passwordHash = bcrypt.hashSync(updateBody.password, 8);
  }
  await User.update(updateBody, { where: { id: userId } });
  user = await getUserById(userId);
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  let user = await getUserById(userId);
  await User.destroy({ where: { id: userId } });
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
