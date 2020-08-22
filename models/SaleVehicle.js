const mongoose = require('mongoose');

const SaleVehicleSchema = new mongoose.Schema({
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
  lastServiceDate: {
    type: Date,
  },
  noOfServicesDone: {
    type: Number,
  },
  insuranceType: { type: String, uppercase: true },
  insuranceCompany: { type: String, uppercase: true },
  insuranceDate: { type: String },
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
  vehicleDocuments: {
    vehicleRegBook: { type: String },
    VIC: { type: String },
    revenueLicence: { type: String },
    deletionLetter: { type: String },
    noObjectionLetter: { type: String },
    mta6Form: { type: String },
    duplicateKey: { type: String },
    ownerNIC: { type: String },
    ownerPhoto: { type: String },
    brCopy: { type: String },
    form42_44: { type: String },
    serviceRecords: { type: String },
    luxuryTax: { type: String },
    assessment: { type: String },
    mta2Form: { type: String },
    cusdec: { type: String },
    exportCertificate: { type: String },
    commercialInvoice: { type: String },
    bureauVeritas: { type: String },
    purchaseOrder: { type: String },
    insuranceCopy: { type: String },
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
    default: true,
  },
});

module.exports = SaleVehicle = mongoose.model(
  'salevehicles',
  SaleVehicleSchema
);
