const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const { Business } = require('../models');
const ApiError = require('../utils/ApiError');


const createBusiness = async (businessBody) => {
    let business = await Business.findOne({ name: businessBody.name });
    if (business) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Mobile Number already taken');
    }
    businessBody.id = uuidv4();
    business = await Business.create(businessBody);
    if (!business) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating business');
    }
    return business;
  };

const queryBusinesses = async (filter, options) => {
    const businesses = await Business.paginate(filter, options);
    return businesses;
}

const getBusinessById = async (id) => {
    const businesses = await Business.find({
      id,
    });
    const business = businesses[0];
    if (!business) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    return business;
  };

const updateBusinessById = async (id, updateBody) => {
    const business = await getBusinessById(id);
    if (!business) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    Object.assign(business, updateBody);
    await business.save();
    return business;
  };

const deleteBusinessById = async (id) => {
    const business = await getBusinessById(id);
    if (!business) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    await Business.deleteOne({ id });
    return business;
  };


module.exports = {
    createBusiness,
    queryBusinesses,
    getBusinessById,
    updateBusinessById,
    deleteBusinessById,
  };