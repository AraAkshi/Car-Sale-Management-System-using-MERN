const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  specialNotes: {
    type: String,
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

module.exports = Inquiry = mongoose.model('inquiries', InquirySchema);
