const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true
    },
    needDate: {
        type: Date,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    replacementBloodGroup: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

requestSchema.index({ email: 1, mobile: 1, bloodGroup: 1, location: 1,needDate:1 });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;