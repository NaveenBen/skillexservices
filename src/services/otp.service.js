const httpStatus = require('http-status');
const { Otp } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a otp
 * @param {Object} otpBody {userId,otp,channel,expiryDate}
 * @returns {Promise<Otp>}
 */

const createOtp = async (otpBody) => {
    const otp = await Otp.create(otpBody);
    if (!otp) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating otp');
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

module.exports = {
    createOtp,
    queryOtps,
    getOtpById,
    getOtpByUserId,
    updateOtpById,
    deleteOtpById,
    Otp
};