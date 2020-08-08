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
  condition: {
    type: String,
    uppercase: true,
  },
  chassisNo: {
    type: String,
    unique: true,
    uppercase: true,
  },
  engineNo: {
    type: String,
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
  },
  fuelType: {
    type: String,
    uppercase: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
  },
  lastServiceDate: {
    type: Date,
  },
  noOfServicesDone: {
    type: Number,
  },
  insurance: {
    type: { type: String, uppercase: true },
    company: { type: String, uppercase: true },
    date: { type: String },
  },
  price: {
    type: String,
  },
  images: {
    type: [String],
  },
  specialNotes: {
    type: String,
    uppercase: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  soldDate: {
    type: Date,
  },
  isInInventory: {
    type: Boolean,
    default: false,
  },
});

module.exports = Vehicle = mongoose.model('vehicles', VehicleScheme);
