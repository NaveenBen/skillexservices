const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const requestValidation = require('../../validations/request.validation');
const requestController = require('../../controllers/request.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createRequest'), validate(requestValidation.createRequest), requestController.createRequest)
  .get(auth('getRequests'), validate(requestValidation.getRequests), requestController.getRequests);

router
  .route('/:requestId')
  .get(auth('getRequest'), validate(requestValidation.getRequest), requestController.getRequest)
  .patch(auth('updateRequest'), validate(requestValidation.updateRequest), requestController.updateRequest)
  .delete(auth('deleteRequest'), validate(requestValidation.deleteRequest), requestController.deleteRequest);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Request management and retrieval
 */

/**
 * @swagger
 * /requests:
 *      post:
 *        summary: Create a request
 *        description: anyone with an account can create a request.
 *        tags: [Requests]
 *        security:
 *          - bearerAuth: []
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                      - userId
 *                      - name
 *                      - problem
 *                      - mobile
 *                      - location
 *                      - needDate
 *                      - bloodGroup
 *                      - replacementBloodGroup
 *                properties:
 *                  name:
 *                    type: string
 *                  problem:
 *                    type: string
 *                  email:
 *                    type: string
 *                  mobile:
 *                    type: string
 *                  location:
 *                    type: string
 *                  needDate:
 *                    type: string
 *                  bloodGroup:
 *                    type: string
 *                  replacementBloodGroup:
 *                    type: string
 *                example:
 *                  userId: "db733dfe-5fd5-4730-b4a2-1f874d186ad0"
 *                  name: John Doe
 *                  problem: Accident
 *                  email: 'john.doe@johndoe.com'
 *                  mobile: '9876543210'
 *                  location: 'Chennai'
 *                  needDate: '2021-06-01'
 *                  bloodGroup: 'A+'
 *                  replacementBloodGroup: 'O+'
 *        responses:
 *          "201":
 *            description: Created
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Requests'
 *          "401":
 *            $ref: '#/components/responses/Unauthorized'
 *          "403":
 *            $ref: '#/components/responses/Forbidden'
 *      get:
 *       summary: Get all requests
 *       description: Only admins and operators can retrieve all requests.
 *       tags: [Requests]
 *       security:
 *          - bearerAuth: []
 *       parameters:
 *          - in: query
 *            searchKey: Search Value for the requests
 *            schema:
 *              type: string
 *            description: Request Search Value
 *          - in: query
 *            name: sortBy
 *            schema:
 *              type: string
 *            description: sort by query in the form of field:desc/asc (ex. name:asc)
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              minimum: 1
 *            default: 10
 *            description: Maximum number of requests per page (default = 10)
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *              minimum: 1
 *              default: 1
 *            description: Page number
 *       responses:
 *         "200":
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   results:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Requests'
 *                   page:
 *                     type: integer
 *                     example: 1
 *                   limit:
 *                     type: integer
 *                     example: 10
 *                   totalPages:
 *                     type: integer
 *                     example: 1
 *                   totalResults:
 *                     type: integer
 *                     example: 1
 *         "401":
 *           $ref: '#/components/responses/Unauthorized'
 *         "403":
 *           $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Get a request by ID
 *     description: Retrieve a request by its ID.
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the request
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requests'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Request not found
 *   patch:
 *     summary: Update a request by ID
 *     description: Update a request by its ID.
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           type: object
 *           $ref: '#/components/schemas/Requests'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requests'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Request not found
 *   delete:
 *     summary: Delete a request by ID
 *     description: Delete a request by its ID.
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the request
 *     responses:
 *       "204":
 *         description: No Content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Request not found
 */
