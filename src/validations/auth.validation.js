const Joi = require('joi');
const { mobile, otp } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().required().email(),
    mobile: Joi.string().required().custom(mobile),
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
