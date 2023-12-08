const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const todoValidation = require('../../validations/todo.validation');
const todoController = require('../../controllers/todo.controller');

const router = express.Router();

router
    .route('/')
    .post(auth("manageTodos"),validate(todoValidation.createTodo), todoController.createTodo)
    .get(auth("getTodos"),validate(todoValidation.getTodos), todoController.getTodos);

router
    .route('/:todoId')
    .get(auth("getTodos"),validate(todoValidation.getTodo), todoController.getTodo)
    .patch(auth("manageTodos"),validate(todoValidation.updateTodo), todoController.updateTodo)
    .delete(auth("manageTodos"),validate(todoValidation.deleteTodo), todoController.deleteTodo);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todos management and retrieval
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a todo
 *     description: User Can create a todo and manage it.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - type   
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               title: fake title
 *               status: fake status
 *               type: fake type
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Todo'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all todos
 *     description: Only users can retrieve all todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
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
 *                     $ref: '#/components/schemas/Todo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo
 *     description: Logged in users can fetch only their own todo information
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Todo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a todo
 *     description: Logged in users can only update their todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: boolean
 *               type:
 *                 type: string
 *             example:
 *               title: fake title
 *               status: true
 *               type: fake type   
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Todo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Todo
 *     description: Logged in users can delete only their todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo id
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
