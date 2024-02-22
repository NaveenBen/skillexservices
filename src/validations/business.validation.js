const Joi  = require('joi');
const { mobile } = require('./custom.validation');

const createBusiness = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().required().custom(mobile),
        address: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().required(),
        pincode: Joi.string().required(),
        category: Joi.string().required(),
    }),
    };

const getBusinesses = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getBusiness = {
    params: Joi.object().keys({
        businessId: Joi.string().required(),
    }),
};

const updateBusiness = {
    params: Joi.object().keys({
        businessId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string(),
        email: Joi.string().email(),
        mobile: Joi.string().custom(mobile),
        address: Joi.string(),
        district: Joi.string(),
        state: Joi.string(),
        pincode: Joi.string(),
        category: Joi.string(),
        userId: Joi.string(),
    }),
};

const deleteBusiness = {
    params: Joi.object().keys({
        businessId: Joi.string().required(),
    }),
};

module.exports = {
    createBusiness,
    getBusinesses,
    getBusiness,
    updateBusiness,
    deleteBusiness,
}
