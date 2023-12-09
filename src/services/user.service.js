const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a user
 * @param {Object} userBody {username,email,mobile,gender,role,dateOfBirth,bloodGroup,lastDonatedDate,location}
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  let user = await User.findOne({ mobile: userBody.mobile });
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mobile Number already taken');
  }
  userBody.id = uuidv4();
  user = await User.create(userBody);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating user');
  }
  return user.toObject();

};

/**
 * Query for users
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (options) => {
  const users = await User.find();
  return users.map(user => user.toObject());
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById({
   id
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user.toObject();
};

/**
 * Get user by mobile
 * @param {string} mobile
 * @returns {Promise<User>}
 */
const getUserBymobile = async (mobile) => {
  const user = await User.findOne({ mobile });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user.toObject();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user.toObject();
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (id, updateBody) => {
  let user = await getUserById(id);
  if (updateBody.mobile) {
    let existingUser = await User.findOne({ mobile: updateBody.mobile });
    if (existingUser && existingUser.id.toString() !== id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }
  await User.findByIdAndUpdate(id, updateBody);
  user = await getUserById(id);
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteUserById = async (id) => {
  let user = await getUserById(id);
  await User.findByIdAndDelete(id); 
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserBymobile,
  updateUserById,
  deleteUserById,
  getUserByEmail
};
