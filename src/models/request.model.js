const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        ref: 'User'
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
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'completed', 'rejected']
    },
    type: {
        type: String,
        default: 'blood',
        enum: ['blood']
    },
},
    {
        timestamps: true,
    }
);

requestSchema.index({ email: 1, mobile: 1, bloodGroup: 1, location: 1,needDate:1 });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;