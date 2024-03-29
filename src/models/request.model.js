const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
const requestSchema = new mongoose.Schema(
  {

    requestorFirstName: {
      type: String,
      required: true,
    },
    requestorLastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required:true
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
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
    bloodComponent:{
      type: String,
      required: true
    },
    quantity:{
      type: String,
      required: true
    },
    immediateRequirement:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

requestSchema.plugin(paginate);
requestSchema.plugin(toJSON);

requestSchema.index({
  email: 1, mobile: 1, bloodGroup: 1, location: 1, needDate: 1,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
