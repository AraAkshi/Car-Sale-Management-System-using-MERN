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
  // myVehicles: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'vehicles',
  // },
  // myAppointments: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'appointments',
  // },
  // myOffers: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'offers',
  // },
});

module.exports = Customer = mongoose.model('customers', CustomerSchema);
