const mongoose = require('mongoose');

const VehicleDocScheme = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicles',
  },
  registered: {
    vehicleRegistrationBook: {},
  },
});

module.exports = VehicleDoc = mongoose.model(
  'vehiclesDocuments',
  VehicleDocScheme
);
