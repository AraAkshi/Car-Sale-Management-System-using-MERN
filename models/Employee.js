const mongoose = require('mongoose');

//Create Schema
const EmployeeSchema = new mongoose.Schema({
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
  designation: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Employee = mongoose.model('employees', EmployeeSchema);
