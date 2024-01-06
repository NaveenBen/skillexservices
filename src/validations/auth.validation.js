const Joi = require('joi');
const { mobile, otp } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required().custom(mobile),
    dateOfBirth: Joi.string().required(),
    bloodGroup: Joi.string(),
    lastDonatedDate: Joi.string().required(),
    location: Joi.string().required(),
    gender: Joi.string().required().valid('male', 'female', 'other'),
  }),
};

const login = {
  body: Joi.object().keys({
    mobile: Joi.string().required(),
    otp: Joi.string().required().custom(otp),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const loginViaOtp = {
  body: Joi.object().keys({
    mobileOrEmail: Joi.string().required(),
    otp: Joi.string().required().custom(otp),
  }),
};

module.exports = {
  register,
  login,
  refreshTokens,
  loginViaOtp,
};
