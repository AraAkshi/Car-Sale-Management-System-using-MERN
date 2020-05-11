const mongoose = require('mongoose');

const VehicleScheme = new mongoose.Schema({
  vehicleRegNo: {
    type: String,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  chassisNo: {
    type: String,
    required: true,
    unique: true,
  },
  engineNo: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  gear: {
    type: String,
  },
  mileage: {
    type: Number,
    required: true,
  },
  originCountry: {
    type: String,
  },
  manufactureYear: {
    type: Date,
    required: true,
  },
  seatingCapacity: {
    type: Number,
  },
  cylinderCapacity: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
  },
  images: {
    type: [String],
  },
});

module.exports = Vehicle = mongoose.model('vehicles', VehicleScheme);
