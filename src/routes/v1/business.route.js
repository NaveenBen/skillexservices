const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const businessValidation = require('../../validations/business.validation');
const businessController = require('../../controllers/business.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('createBusiness'), validate(businessValidation.createBusiness), businessController.createBusiness)
    .get(auth('getBusinesses'), validate(businessValidation.getBusinesses), businessController.getBusinesses);

router
    .route('/:businessId')
    .get(auth('getBusiness'), validate(businessValidation.getBusiness), businessController.getBusiness)
    .patch(auth('updateBusiness'), validate(businessValidation.updateBusiness), businessController.updateBusiness)
    .delete(auth('deleteBusiness'), validate(businessValidation.deleteBusiness), businessController.deleteBusiness);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: Business management and retrieval
 */

/**
 * @swagger
 * /businesses:
 *   post:
 *     summary: Create a Business
 *     description: Only admins can create other businesses.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - address
 *               - district
 *               - state
 *               - pincode       
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               mobile:
 *                  type: string
 *                  description: must be unique
 *                  minLength: 10
 *                  maxLength: 10
 *               address:
 *                  type: string
 *                  description: must be supported string
 *                  minLength: 10
 *                  maxLength: 100
 *               district:
 *                  type: string
 *                  description: must be supported string
 *                  minLength: 3
 *                  maxLength: 50
 *               state:
 *                  type: string
 *                  description: must be supported string
 *                  minLength: 3
 *                  maxLength: 50
 *               pincode:
 *                  type: string
 *                  description: must be supported string
 *                  minLength: 6
 *                  maxLength: 6            
 *             example:
 *               name: fake business name
 *               email: fake@business.com
 *               mobile: "9977886655"
 *               address: fake address
 *               district: fake district
 *               state: fake state
 *               pincode: "123456"
 *               category: others         
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Business'
 *       "400":
 *         $ref: '#/components/responses/DuplicateMobile'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all businesses
 *     description: Only admins can retrieve all businesses.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Business name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of businesses
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Business'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /businesses/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in businesses can fetch only their own user information. Only admins can fetch other businesses.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Business'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a user
 *     description: Logged in businesses can only update their own information. Only admins can update other businesses.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Business'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in businesses can delete only themselves. Only admins can delete other businesses.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
