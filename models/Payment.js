const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicles',
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'directCustomers',
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  paymentBreakdown: [
    {
      paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paymentMethods',
      },
      paymentAmount: { type: String },
      paidDate: { type: Date },
    },
  ],
  totalAmountPaid: {
    type: String,
  },
  remainingAmount: {
    type: String,
    default: null,
  },
});

module.exports = Payment = mongoose.model('payments', PaymentSchema);
