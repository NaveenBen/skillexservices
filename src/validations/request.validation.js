const Joi = require('joi');
const { mobile } = require('./custom.validation');

const createRequest = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    problem: Joi.string().required(),
    email: Joi.string().email(),
    mobile: Joi.string().required().custom(mobile),
    location: Joi.string().required(),
    needDate: Joi.string().required(),
    bloodGroup: Joi.string().required().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    replacementBloodGroup: Joi.string().required().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    status: Joi.string().valid('pending', 'accepted', 'completed', 'rejected'),
    type: Joi.string().valid('request', 'donation'),
  }),
};

const getRequests = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRequest = {
  params: Joi.object().keys({
    requestId: Joi.string(),
  }),
};

const updateRequest = {
  params: Joi.object().keys({
    requestId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string(),
      name: Joi.string(),
      problem: Joi.string(),
      email: Joi.string().email(),
      mobile: Joi.string().custom(mobile),
      location: Joi.string(),
      needDate: Joi.string(),
      bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
      replacementBloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
      updatedAt: Joi.date(),
      status: Joi.string().valid('pending', 'accepted', 'completed', 'rejected'),
    })
    .min(1),
};

const deleteRequest = {
  params: Joi.object().keys({
    requestId: Joi.string(),
  }),
};

module.exports = {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
};
