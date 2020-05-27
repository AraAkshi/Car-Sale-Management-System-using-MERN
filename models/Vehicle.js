const mongoose = require('mongoose');

const VehicleScheme = new mongoose.Schema({
  vehicleRegNo: {
    type: String,
    unique: true,
    uppercase: true,
  },
  model: {
    type: String,
    required: true,
    uppercase: true,
  },
  make: {
    type: String,
    required: true,
    uppercase: true,
  },
  status: {
    type: String,
    required: true,
    uppercase: true,
  },
  chassisNo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  engineNo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  color: {
    type: String,
    required: true,
    uppercase: true,
  },
  gear: {
    type: String,
    uppercase: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  originCountry: {
    type: String,
    uppercase: true,
  },
  manufactureYear: {
    type: String,
    required: true,
  },
  seatingCapacity: {
    type: Number,
  },
  cylinderCapacity: {
    type: Number,
  },
  registeredDate: {
    type: Date,
  },
  owner: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'employees',
    type: String,
    default: 'NADEESHANS',
  },
  images: {
    type: [String],
  },
  specialNotes: {
    type: String,
    uppercase: true,
  },
});

module.exports = Vehicle = mongoose.model('vehicles', VehicleScheme);