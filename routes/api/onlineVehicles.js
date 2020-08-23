const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');
const multer = require('multer');
const { check, validationResult } = require('express-validator');

const Vehicle = require('../../models/OnlineVehicle');
const Customer = require('../../models/OnlineCustomer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/vehicles
// @desc    Create vehicles
// @access  private
router.post(
  '/',
  [
    upload.array('images', 6),
    auth,
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
      price,
    } = req.body;

    const vehicleFields = {};

    userId = req.user.id;
    vehicleFields.owner = userId;
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

    if (req.files) {
      vehicleFields.images = req.files.map(image => {
        return image.path;
      });
    }

    try {
      //Create record
      let vehicle = new Vehicle(vehicleFields);
      await vehicle.save();

      res.json(vehicle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/vehicles/:vehicle_id
// @desc    Update online vehicles
// @access  private
router.put(
  '/:vehicle_id',
  [
    upload.array('images', 6),
    auth,
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
      price,
      isInInventory,
    } = req.body;

    const vehicleFields = {};

    if (vehicleRegNo) vehicleFields.vehicleRegNo = vehicleRegNo;
    if (isInInventory) vehicleFields.isInInventory = isInInventory;
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/vehicles/my-vehicles
// @desc    View a selected vehicle
// @access  private
router.get('/my-vehicles', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicle = await Vehicle.find(
      {
        owner: userId,
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
    );
    if (!vehicle) {
      return res.status(400).json({ msg: 'You have not added any Vehicles' });
    }

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Vehicles Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/vehicles/:client_id
// @desc    View a selected vehicle
// @access  private
router.get('/my-vehicles', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.find(
      {
        owner: req.params.client_id,
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
    );
    if (!vehicle) {
      return res.status(400).json({ msg: 'You have not added any Vehicles' });
    }

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Vehicles Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/vehicles
// @desc    View all vehicles
// @access  public
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find(
      { isInInventory: true },
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
        specialNotes: 1,
        images: 1,
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
    ).populate('owner', ['name', 'contact']);
    if (!vehicle) {
      return res.status(400).json({ msg: 'Vehicle Details Not Found' });
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

// @route    DELETE api/vehicles/:vehicle_id
// @desc     Delete online vehicle
// @access   Private
router.delete('/:vehicle_id', auth, async (req, res) => {
  try {
    await Vehicle.findOneAndRemove({ _id: req.params.vehicle_id });
    res.json({ msg: 'Vehicle deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
