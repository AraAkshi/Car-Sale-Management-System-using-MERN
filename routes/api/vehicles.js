const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Vehicle = require('../../models/Vehicle');

// @route   POST api/vehicles
// @desc    Create/Update vehicles
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('model', 'Model is required').not().isEmpty(),
      check('make', 'Make is required').not().isEmpty(),
      check('manufactureYear', 'Manufacture Year is required').not().isEmpty(),
      check('mileage', 'Mileage is required').not().isEmpty(),
      check('status', 'Vehicle status is required').not().isEmpty(),
      check('chassisNo', 'Chassis Number is required').not().isEmpty(),
      check('engineNo', 'Engine Number is required').not().isEmpty(),
      check('color', 'Vehicle Color is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      vehicleRegNo,
      model,
      make,
      status,
      chassisNo,
      engineNo,
      color,
      gear,
      mileage,
      originCountry,
      manufactureYear,
      seatingCapacity,
      cylinderCapacity,
      registeredDate,
      owner,
      images,
      specialNotes,
    } = req.body;

    const vehicleFields = {};
    if (vehicleRegNo) vehicleFields.vehicleRegNo = vehicleRegNo;
    if (model) vehicleFields.model = model;
    if (make) vehicleFields.make = make;
    if (status) vehicleFields.status = status;
    if (chassisNo) vehicleFields.chassisNo = chassisNo;
    if (engineNo) vehicleFields.engineNo = engineNo;
    if (color) vehicleFields.color = color;
    if (gear) vehicleFields.gear = gear;
    if (mileage) vehicleFields.mileage = mileage;
    if (originCountry) vehicleFields.originCountry = originCountry;
    if (manufactureYear) vehicleFields.manufactureYear = manufactureYear;
    if (seatingCapacity) vehicleFields.seatingCapacity = seatingCapacity;
    if (cylinderCapacity) vehicleFields.cylinderCapacity = cylinderCapacity;
    if (registeredDate) vehicleFields.registeredDate = registeredDate;
    if (owner) vehicleFields.owner = owner;
    if (images) {
      vehicleFields.images = images.split(',');
    }
    if (specialNotes) vehicleFields.specialNotes = specialNotes;

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

      //Create profile
      vehicle = new Vehicle(vehicleFields);
      await vehicle.save();

      res.json(vehicle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/vehicles
// @desc    View all vehicles
// @access  public
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/vehicles/:vehicle_id
// @desc    View a selected vehicle
// @access  public
router.get('/:vehicle_id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicle_id });
    console.log(vehicle);
    if (!vehicle) {
      return res.status(400).json({ msg: 'Vehicle Not Found' });
    }

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Vehicle Not Found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
