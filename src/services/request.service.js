const httpStatus = require('http-status');
const { Request } = require('../models');
const ApiError = require('../utils/ApiError');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a request
 * @param {Object} requestBody {name,problem,email,mobile,location,needDate,bloodGroup,replacementBloodGroup}
 * @returns {Promise<Request>}
 */

const createRequest = async (requestBody) => {  
    requestBody.id = uuidv4();
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