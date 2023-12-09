const express = require('express');
const validate = require('../../middlewares/validate');
const otpValidation = require('../../validations/otp.validation.js');
const otpController = require('../../controllers/otp.controller.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: Operations related to OTP
 */

/**
 * @swagger
 * /otp:
 *   post:
 *     summary: Send OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - mobileOrEmail
 *                  properties:
 *                      mobileOrEmail:
 *                          type: string
 *                          description: mobile number or email
 *                  example:
 *                      mobileOrEmail: 'fake@example.com'                   
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
router
    .route('/')
    .post(validate(otpValidation.sendOtp), otpController.sendOtp);

/**
 * @swagger
 * /api/v1/otp/verify:
 *  post:
 *      summary: Verify OTP
 */
router
    .route('/verify')
    .post(validate(otpValidation.verifyOtp), otpController.verifyOtp);

module.exports = router;


