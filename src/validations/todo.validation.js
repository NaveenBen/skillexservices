const Joi = require('joi');

const createTodo = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        status: Joi.boolean().required(),
        type: Joi.string().required(),
    }),
}

const getTodos = {
}

const getTodo = {
    params: Joi.object().keys({
        todoId: Joi.string().required(),
    }),
}

const updateTodo = {
    params: Joi.object().keys({
        todoId: Joi.required(),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string(),
            status: Joi.boolean(),
            type: Joi.string(),
        })
        .min(1),
}

const deleteTodo = {
    params: Joi.object().keys({
        todoId: Joi.string().required(),
    }),
}

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
}