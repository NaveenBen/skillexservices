const httpStatus = require('http-status');
const { Todo } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

/**
 * Create a todo
 * @param {Object} todoBody
 * @returns {Promise<Todo>}
 */

const createTodo = async (todoBody) => {
    await Todo.create(todoBody);
    let todo = await Todo.findAll({ where: { title: todoBody.title } });
    if (todo.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating todo');
    }
    return todo[0].dataValues;
}

/**
 * Query for todos
 * @returns {Promise<QueryResult>}
 */

const queryTodos = async (optons) => {
    const todos = await Todo.findAll();
    return todos.map(todo => todo.dataValues);
}

/**
 * Get todo by id
 * @param {ObjectId} id
 * @returns {Promise<Todo>}
 */

const getTodoById = async (id) => {
    const todo = await Todo.findAll({ where: { id } });
    if (todo.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
    }
    return todo[0].dataValues;
}

/**
 * Update todo by id
 * @param {ObjectId} todoId
 * @param {Object} updateBody
 * @returns {Promise<Todo>}
 */

const updateTodoById = async (todoId, updateBody) => {
    const todo = await getTodoById(todoId);
    if (!todo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
    }
    let todoUpdate = await Todo.update(updateBody, { where: { id: todoId } });
    if (todoUpdate.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error updating todo');
    }
    todoUpdate = await Todo.findAll({ where: { id: todoId } });
    if (todoUpdate.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error updating todo');
    }
    return todoUpdate[0].dataValues;
}

/**
 * Delete todo by id
 * @param {ObjectId} todoId
 * @returns {Promise<Todo>}
 */

const deleteTodoById = async (todoId) => {
    const todo = await getTodoById(todoId);
    if (!todo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
    }
    let todoDelete = await Todo.destroy({ where: { id: todoId } });
    if (todoDelete.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error deleting todo');
    }
    todoDelete = await Todo.findAll({ where: { id: todoId } });
    if (todoDelete.length !== 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error deleting todo');
    }
    return todo;
}

module.exports = {
    createTodo,
    queryTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById,
}