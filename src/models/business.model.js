const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');

const businessSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true
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
    address: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
businessSchema.plugin(paginate);
businessSchema.plugin(toJSON);

businessSchema.index({
  email: 1, mobile: 1
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
