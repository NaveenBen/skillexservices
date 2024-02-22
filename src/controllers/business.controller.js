const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { businessService } = require('../services');

const createBusiness = catchAsync(async (req, res) => {
    req.body.userId = req.user.id;
    const business = await businessService.createBusiness(req.body);
    res.status(httpStatus.CREATED).send(business);
});

const getBusinesses = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await businessService.queryBusinesses(filter, options);
    res.send(result);
});

const getBusiness = catchAsync(async (req, res) => {
    const business = await businessService.getBusinessById(req.params.businessId);
    if (!business) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    res.send(business);
});

const updateBusiness = catchAsync(async (req, res) => {
    req.body.userId = req.user.id;
    const business = await businessService.updateBusinessById(req.params.businessId, req.body);
    res.send(business);
});

const deleteBusiness = catchAsync(async (req, res) => {
    await businessService.deleteBusinessById(req.params.businessId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createBusiness,
    getBusinesses,
    getBusiness,
    updateBusiness,
    deleteBusiness,
};