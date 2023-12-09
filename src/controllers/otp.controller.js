const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { otpService,userService } = require('../services');

const createOtp = catchAsync(async (req, res) => {
    const otp = await otpService.createOtp(req.body);
    res.status(httpStatus.CREATED).send(otp);
});

const getOtps = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['userId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await otpService.queryOtps(filter, options);
    res.send(result);
});

const getOtp = catchAsync(async (req, res) => {
    const otp = await otpService.getOtpById(req.params.otpId);
    if (!otp) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
    }
    res.send(otp);
});

const verifyOtp = catchAsync(async (req, res) => {

    const { mobileOrEmail, otp } = req.body;

    const otpResp = await otpService.verifyOtp({ mobileOrEmail, otp });
    res.send(otpResp);
});

const sendOtp = catchAsync(async (req, res) => {

    const { mobileOrEmail } = req.body;
    let user;

    let mobileRegex = /^[0-9]{10}$/;
    let emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (mobileRegex.test(mobileOrEmail)) {
        user = await userService.getUserBymobile(mobileOrEmail);
    } else if (emailRegex.test(mobileOrEmail)) {
        user = await userService.getUserByEmail(mobileOrEmail);
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid mobile or email');
    }

    // if user exists then creat a otp record and send the otp both in email and dummy response
    if (user) {
        const otp = await otpService.createOtp({ userId: user.id, channel: 'email' });

        // if env is development then send the otp in response
        if (process.env.NODE_ENV === 'development') {
            return res.send({ otp });
        }
        return res.send({ 
            message: 'OTP sent successfully',
         });
        // send otp to email extend the logic to send otp to mobile
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }


});



module.exports = {
    createOtp,
    getOtps,
    getOtp,
    verifyOtp,
    sendOtp
};