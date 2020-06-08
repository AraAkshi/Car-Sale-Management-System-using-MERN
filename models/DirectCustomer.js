const mongoose = require('mongoose');

const DirectCustomerSchema = new mongoose.Schema({
  nic: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    houseNo: { type: String },
    streetName: { type: String },
    city: { type: String },
  },
  contact: {
    type: Number,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
  },
});

module.exports = DirectCustomer = mongoose.model(
  'directCustomers',
  DirectCustomerSchema
);
