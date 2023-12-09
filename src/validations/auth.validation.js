const Joi = require('joi');
const {mobile,otp} = require('./custom.validation');
const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required().custom(mobile),
    dateOfBirth: Joi.string().required(),
    bloodGroup: Joi.string().required().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    lastDonatedDate: Joi.string().required(),
    location: Joi.string().required(),
    gender : Joi.string().required().valid('male','female','other')
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

module.exports = {
  register,
  login,
  refreshTokens
};
