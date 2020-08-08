const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Appointment = require('../../models/Appointment');
const Customer = require('../../models/Customer');

// @route   POST api/appointments/:vehicle_id
// @desc    Create/Update Appointments
// @access  private
router.post(
  '/:vehicle_id',
  [
    auth,
    [
      check('scheduleDate', 'Date is required').not().isEmpty(),
      check('scheduleTime', 'Time is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scheduleDate, scheduleTime, specialNotes } = req.body;

    const appointmentFields = {};

    appointmentFields.customer = req.user.id;
    appointmentFields.vehicle = req.params.vehicle_id;

    if (scheduleDate) appointmentFields.scheduleDate = scheduleDate;
    if (scheduleTime) appointmentFields.scheduleTime = scheduleTime;
    if (specialNotes) appointmentFields.specialNotes = specialNotes;

    try {
      let appointment = await Appointment.findOne({
        _id: req.params.appointment_id,
      });

      if (appointment) {
        //Update
        appointment = await Appointment.findOneAndUpdate(
          { _id: req.params.appointment_id },
          { $set: appointmentFields },
          { new: true }
        );
        return res.json(appointment);
      }

      //Create record
      appointment = new Appointment(appointmentFields);
      customer = new Customer(appointmentFields);
      await appointment.save();

      res.json(appointment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/appointments/my-appointments
// @desc    View appointments of logged in user
// @access  private
router.get('/my-appointments', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({
      customer: userId,
    })
      .populate('customer', ['name', 'contact'])
      .populate('vehicle', [
        'condition',
        'make',
        'model',
        'manufactureYear',
        'mileage',
        'vehicleRegNo',
        'specialNotes',
      ]);
    if (!appointments) {
      return res
        .status(400)
        .json({ msg: 'You have not made any Appointments' });
    }
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Appointments Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/appointments
// @desc    View all appointments
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('customer', ['name', 'contact'])
      .populate('vehicle', [
        'condition',
        'make',
        'model',
        'manufactureYear',
        'mileage',
        'vehicleRegNo',
        'specialNotes',
      ]);

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/appointments/:appointment_id
// @desc    View an appointment
// @access  private
router.get('/:appointment_id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.appointment_id,
    })
      .populate('customer', ['name', 'contact'])
      .populate('vehicle', [
        'condition',
        'make',
        'model',
        'manufactureYear',
        'mileage',
        'vehicleRegNo',
        'specialNotes',
      ]);
    if (!appointment) {
      return res.status(400).json({ msg: 'Appointment Details Not Found' });
    }
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Appointment Not Found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
