const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    mobile: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    lastDonatedDate: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;