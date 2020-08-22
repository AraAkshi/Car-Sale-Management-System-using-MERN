const mongoose = require('mongoose');

const OnlineCustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  houseNo: { type: String },
  streetName: { type: String },
  city: { type: String },
  contact: {
    type: Number,
  },
  password: {
    type: String,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = OnlineCustomer = mongoose.model(
  'onlinecustomers',
  OnlineCustomerSchema
);
