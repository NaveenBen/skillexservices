const Joi = require('joi');
const { mobile } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user','donor','volunteer','admin'),
    mobile: Joi.string().required().custom(mobile),
    dateOfBirth: Joi.string().required(),
    bloodGroup: Joi.string().required().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    lastDonatedDate: Joi.string().required(),
    location: Joi.string().required(),
    gender: Joi.string().required().valid('male','female','other')
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
      role: Joi.string().valid('user', 'volunteer', 'admin'),
      mobile: Joi.string(),
      dateOfBirth: Joi.string(),
      bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
      lastDonatedDate: Joi.string(),
      location: Joi.string(),
      updatedAt: Joi.date(),
      gender: Joi.string().required().valid('male','female','other')
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
