const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
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
  password: {
    type: String,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model('customers', CustomerSchema);
