const mongoose = require('mongoose')

//Create Schema
const CustomerSchema = new mongoose.Schema({
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Customer = mongoose.model('customer', CustomerSchema)
