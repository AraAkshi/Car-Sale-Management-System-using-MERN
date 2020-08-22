const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const { check, validationResult } = require('express-validator');

const Vehicle = require('../../models/SaleVehicle');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      'D:/ISH/MIT/MIT Project/Development Project/Car_sale_mgt_system/client/src/uploads/vehicleDocuments'
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/sale-vehicles/vehicle-documents
// @desc    Create/Update vehicles
// @access  private
router.post('/', [upload.array('images', 25), auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const vehicleFields = {};

  if (req.files) {
    vehicleFields.images = req.files.map(image => {
      return image.path;
    });
  }

  try {
    let vehicle = await Vehicle.findOne({ _id: req.params.vehicle_id });

    if (vehicle) {
      //Update
      vehicle = await Vehicle.findOneAndUpdate(
        { _id: req.params.vehicle_id },
        { $set: vehicleFields },
        { new: true }
      );
      return res.json(vehicle);
    }

    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
