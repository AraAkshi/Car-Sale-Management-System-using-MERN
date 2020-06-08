const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerContact: {
    type: Number,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  inquiredAbout: {
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
