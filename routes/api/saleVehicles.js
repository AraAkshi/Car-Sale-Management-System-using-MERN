const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const { check, validationResult } = require('express-validator');

const Vehicle = require('../../models/SaleVehicle');
const Customer = require('../../models/DirectCustomer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/sale-vehicles
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
      check('mileage', 'Mileage is required').not().isEmpty(),
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
      lastServiceDate,
      noOfServicesDone,
      insuranceType,
      insuranceCompany,
      insuranceDate,
      specialNotes,
      price,
    } = req.body;

    const vehicleFields = {};

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
    if (lastServiceDate) vehicleFields.lastServiceDate = lastServiceDate;
    if (noOfServicesDone) vehicleFields.noOfServicesDone = noOfServicesDone;
    if (insuranceType) vehicleFields.insuranceType = insuranceType;
    if (insuranceCompany) vehicleFields.insuranceCompany = insuranceCompany;
    if (insuranceDate) vehicleFields.insuranceDate = insuranceDate;
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

// @route   GET api/sale-vehicles
// @desc    View all vehicles
// @access  public
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      isInInventory: true,
    }).populate('owner', ['name', 'contact', 'nic', 'email', 'address']);

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sale-vehicles/sales
// @desc    View all sold vehicles
// @access  public
router.get('/sales', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      sold: true,
    }).populate('owner', ['name', 'contact', 'nic', 'email', 'address']);

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sale-vehicles/:vehicle_id
// @desc    View a selected vehicle
// @access  public
router.get('/:vehicle_id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicle_id,
    }).populate('owner', ['name', 'contact', 'nic', 'email', 'address']);
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

// @route   PUT api/saleVehicles/:vehicle_id
// @desc    Update vehicles
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
      check('mileage', 'Mileage is required').not().isEmpty(),
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
      lastServiceDate,
      noOfServicesDone,
      insuranceType,
      insuranceCompany,
      insuranceDate,
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
    if (lastServiceDate) vehicleFields.lastServiceDate = lastServiceDate;
    if (noOfServicesDone) vehicleFields.noOfServicesDone = noOfServicesDone;
    if (insuranceType) vehicleFields.insuranceType = insuranceType;
    if (insuranceCompany) vehicleFields.insuranceCompany = insuranceCompany;
    if (insuranceDate) vehicleFields.insuranceDate = insuranceDate;
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

// @route    DELETE api/sale-vehicles/:vehicle_id
// @desc     Delete sale vehicle
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

// @route   PUT api/saleVehicles/sold/:vehicle_id
// @desc    Update vehicles
// @access  private
router.put('/sold/:vehicle_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const vehicleFields = {};

  vehicleFields.isInInventory = false;
  vehicleFields.sold = true;

  let dateObj = new Date();
  let date = ('0' + dateObj.getDate()).slice(-2);
  let month = ('0' + dateObj.getMonth() + 1).slice(-2);
  let year = dateObj.getFullYear();
  vehicleFields.soldDate = year + '-' + month + '-' + date;

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
});

module.exports = router;
