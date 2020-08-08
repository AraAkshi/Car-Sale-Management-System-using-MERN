const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
  },
  scheduleDate: {
    type: Date,
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
    ref: 'vehicles',
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Appointment = mongoose.model(
  'appointments',
  AppointmentSchema
);
