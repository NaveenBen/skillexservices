const httpStatus = require('http-status');
const { Request } = require('../models');
const ApiError = require('../utils/ApiError');
const short = require('short-uuid');
const translator = short();

/**
 * Create a request
 * @param {Object} requestBody {name,problem,email,mobile,location,needDate,bloodGroup,replacementBloodGroup}
 * @returns {Promise<Request>}
 */

const createRequest = async (requestBody) => {  
    requestBody.id = translator.generate();
    const request = await Request.create(requestBody);
    if (!request) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating request');
    }
    return request.toObject();
}

/**
 * Query for requests
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryRequests = async (options) => {
    const requests = await Request.find();
    return requests.map(request => request.toObject());
}

/**
 * Get request by id
 * @param {ObjectId} id
 * @returns {Promise<Request>}
 */

const getRequestById = async (id) => {
    try{
        const requests = await Request.find({
            id: id
        })
        let request = requests[0];
        if (!request) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
        }
        return request.toObject();
    }catch(error){
        console.log("🚀 ~ file: request.service.js:52 ~ getRequestById ~ error:", error)
        throw error;
    }
}

/**
 * Update request by id
 * @param {ObjectId} requestId
 * @param {Object} updateBody
 * @returns {Promise<Request>}
 */

const updateRequestById = async (requestId, updateBody) => {
    let request = await getRequestById(requestId);
    if (!request) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }

    const updatedRequest = await Request.updateOne({id: requestId}, updateBody);

    if (!updatedRequest) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error updating request');
    }

    return updatedRequest;
};

const deleteRequestById = async (requestId) => {
    const request = await getRequestById(requestId);
    if (!request) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }
    const deleteRequest = await Request.deleteOne({id: requestId});
    if (!deleteRequest) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error deleting request');
    }
    return deleteRequest;
}

module.exports = {
    createRequest,
    queryRequests,
    getRequestById,
    updateRequestById,
    deleteRequestById
};