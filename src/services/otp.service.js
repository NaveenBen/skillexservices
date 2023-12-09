const httpStatus = require('http-status');
const { Otp } = require('../models');
const ApiError = require('../utils/ApiError');
const cryptojs = require('crypto-js');
const {randomInt} = require('crypto')
const config = require('../config/config');
/**
 * Create a otp
 * @param {Object} otpBody {userId,otp,channel,expiryDate}
 * @returns {Promise<Otp>}
 */

const createOtp = async (otpBody) => {

    let existingOtp = await Otp.findOne({ userId: otpBody.userId });

    if (existingOtp) {
        await Otp.findByIdAndDelete(existingOtp.id);
    }
    // lets generate a random 6 digit number using cryptojs

    let otpNum = randomInt(100000, 999999).toString();

    // now lets encrypt the otp using cryptojs

    let encryptedOtp = cryptojs.AES.encrypt(otpNum, config.otp.secret).toString();

    // otp expiry date is current time + config.otp.expirationMinutes

    otpBody.expiryDate = new Date(new Date().getTime() + config.otp.expirationMinutes * 60 * 1000);

    otpBody.otp = encryptedOtp;

    const otp = await Otp.create(otpBody);
    if (!otp) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating otp');
    }
    if (process.env.NODE_ENV === 'development') {
        return otpNum;
    }
    return otp.toObject();
}

/**
 * Query for otp
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryOtps = async (options) => {
    const otps = await Otp.find();
    return otps.map(otp => otp.toObject());
}

/**
 * Get otp by id
 * @param {ObjectId} id
 * @returns {Promise<Otp>}
 */

const getOtpById = async (id) => {
    const otp = await Otp.findById({
        id
    });
    if (!otp) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
    }
    return otp.toObject();
}

/**
 * Get otp by userId
 * @param {string} userId
 * @returns {Promise<Otp>}
 */

const getOtpByUserId = async (userId) => {
    const otp = await Otp.findOne({ userId });
    if (!otp) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
    }
    return otp.toObject();
}

/**
 * Update otp by id
 * @param {ObjectId} otpId
 * @param {Object} updateBody
 * @returns {Promise<Otp>}
 */

const updateOtpById = async (id, updateBody) => {
    try {

        let otp = await getOtpById(id);
        if (updateBody.otp) {
            otp.otp = updateBody.otp;
        }
        if (updateBody.channel) {
            otp.channel = updateBody.channel;
        }
        if (updateBody.expiryDate) {
            otp.expiryDate = updateBody.expiryDate;
        }
        await otp.save();
        return otp.toObject();

    } catch (error) {
        console.log("🚀 ~ file: otp.service.js:72 ~ updateOtpById ~ error:", error)
        
    }
}

/**
 * Delete otp by id
 * @param {ObjectId} id
 * @returns {Promise<Otp>}
 */

const deleteOtpById = async (id) => {
    let otp = await getOtpById(id);
    await Otp.findByIdAndDelete(id);
    return otp;
}

const getOtpByMobileOrEmail = async (mobileOrEmail) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const mobileRegex = /^[6-9]\d{9}$/;

    let user;
    if (emailRegex.test(mobileOrEmail)) {
        user = await userService.getUserByEmail(mobileOrEmail);
    } else if (mobileRegex.test(mobileOrEmail)) {
        user = await userService.getUserBymobile(mobileOrEmail);
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please enter valid email or mobile');
    }
    return user;
};

const verifyOtpWithSecret = async (otp, encryptedOtp) => {
    const bytes = cryptojs.AES.decrypt(encryptedOtp, config.otp.secret);
    const originalOtp = bytes.toString(cryptojs.enc.Utf8);
    return otp === originalOtp;
}


const verifyOtp = async ({ mobileOrEmail, otp }) => {
    const user = await getOtpByMobileOrEmail(mobileOrEmail);
    const otpObj = await getOtpByUserId(user.id);
    if (!otpObj) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
    }
    const isOtpValid = await verifyOtpWithSecret(otp, otpObj.otp);
    if (!isOtpValid) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect otp');
    }
    return otpObj;
};

module.exports = {
    createOtp,
    queryOtps,
    getOtpById,
    getOtpByUserId,
    updateOtpById,
    deleteOtpById,
    getOtpByMobileOrEmail,
    verifyOtp
};