const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');
//const multer = require('multer');
const { check, validationResult } = require('express-validator');

const Vehicle = require('../../models/Vehicle');

// @route   POST api/vehicles
// @desc    Create/Update vehicles
// @access  private
router.post(
  '/',
  [
    [
      check('model', 'Model is required').not().isEmpty(),
      check('make', 'Make is required').not().isEmpty(),
      check('manufactureYear', 'Manufacture Year is required').not().isEmpty(),
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
      condition,
      chassisNo,
      engineNo,
      color,
      gear,
      mileage,
      fuelType,
      originCountry,
      manufactureYear,
      seatingCapacity,
      cylinderCapacity,
      registeredDate,
      specialNotes,
      images,
      price,
    } = req.body;

    const vehicleFields = {};
    vehicleFields.owner = {};

    try {
      vehicleFields.owner.customer = req.customer.id;
    } catch {
      vehicleFields.owner.customer = null;
    }
    vehicleFields.isInInventory = true;

    if (vehicleRegNo) vehicleFields.vehicleRegNo = vehicleRegNo;
    if (model) vehicleFields.model = model;
    if (make) vehicleFields.make = make;
    if (condition) vehicleFields.condition = condition;
    if (chassisNo) vehicleFields.chassisNo = chassisNo;
    if (engineNo) vehicleFields.engineNo = engineNo;
    if (color) vehicleFields.color = color;
    if (gear) vehicleFields.gear = gear;
    if (mileage) vehicleFields.mileage = mileage;
    if (fuelType) vehicleFields.fuelType = fuelType;
    if (originCountry) vehicleFields.originCountry = originCountry;
    if (manufactureYear) vehicleFields.manufactureYear = manufactureYear;
    if (seatingCapacity) vehicleFields.seatingCapacity = seatingCapacity;
    if (cylinderCapacity) vehicleFields.cylinderCapacity = cylinderCapacity;
    if (registeredDate) vehicleFields.registeredDate = registeredDate;
    if (price) vehicleFields.price = price;
    if (specialNotes) vehicleFields.specialNotes = specialNotes;
    if (images) vehicleFields.images = images;

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

      //Create record
      vehicle = new Vehicle(vehicleFields);
      await vehicle.save();

      res.json(vehicle);
    } catch (err) {
      console.log(vehicleFields);
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
    const vehicles = await Vehicle.find(
      { isInventory: true, sold: false },
      {
        _id: 1,
        vehicleRegNo: 1,
        model: 1,
        make: 1,
        condition: 1,
        color: 1,
        gear: 1,
        mileage: 1,
        fuelType: 1,
        originCountry: 1,
        manufactureYear: 1,
        price: 1,
        images: 1,
        specialNotes: 1,
      }
    ).populate('owner', ['name', 'contact']);

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
    const vehicle = await Vehicle.findOne(
      {
        _id: req.params.vehicle_id,
        isInventory: true,
        sold: false,
      },
      {
        vehicleRegNo: 1,
        model: 1,
        make: 1,
        condition: 1,
        color: 1,
        gear: 1,
        mileage: 1,
        fuelType: 1,
        originCountry: 1,
        manufactureYear: 1,
        price: 1,
        images: 1,
        specialNotes: 1,
      }
    ).populate('customers', ['name', 'contact']);
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
