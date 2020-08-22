const mongoose = require('mongoose');

const DirectCustomerSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'salevehicles',
  },
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
  houseNo: { type: String },
  streetName: { type: String },
  city: { type: String },
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
  'directcustomers',
  DirectCustomerSchema
);
