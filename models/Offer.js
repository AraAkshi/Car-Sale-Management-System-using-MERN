const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'onlinecustomers',
  },
  amount: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  specialNotes: {
    type: String,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'salevehicles',
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Offer = mongoose.model('offers', OfferSchema);
