const Joi = require('joi');


const createOtp = {
    body: Joi.object().keys({
        userId: Joi.string().required(),
        otp: Joi.string().required(),
        channel: Joi.string().required(),
        expiryDate: Joi.string().required()
    }),
};

const getOtp = {
    params: Joi.object().keys({
        userId: Joi.string().required(),
        mobile: Joi.string(),
        email: Joi.string()
    }),
};

const verifyOtp = {
    body:{
        otp: Joi.string().required(),
        mobileOrEmail: Joi.string().required(),
    }
};

const sendOtp = {
    body: {
        mobileOrEmail: Joi.string().required(),
    }
}

module.exports = {
    createOtp,
    getOtp,
    verifyOtp,
    sendOtp
};
