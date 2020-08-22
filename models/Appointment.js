const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'onlinecustomers',
  },
  scheduleDate: {
    type: String,
    required: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  specialNotes: {
    type: String,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'salevehicles',
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
});

module.exports = Appointment = mongoose.model(
  'appointments',
  AppointmentSchema
);
