const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: {
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
            enum: ['male', 'female', 'other']
        },
        role: {
            type: String,
            default: 'donor',
            enum: ['donor', 'volunteer', 'organization']
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        lastDonatedDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ email: 1, mobile: 1,bloodGroup:1,lastDonatedDate:1,location:1});

const User = mongoose.model('User', userSchema);

module.exports = User;