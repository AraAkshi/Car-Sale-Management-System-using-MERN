const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = PaymentMethod = mongoose.model(
  'paymentMethods',
  PaymentMethodSchema
);
