const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const Profile = require('../../models/DirectCustomer');
const { check, validationResult } = require('express-validator');

// @route    GET api/clientProfiles/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        _id: user_id,
      })
        .populate('myVehicles', [
          'condition',
          'make',
          'model',
          'manufactureYear',
        ])
        .populate('myAppointments', [
          'scheduleDate',
          'scheduleTime',
          'isAttended',
        ])
        .populate('myOffers', ['amount', 'enteredDate']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    GET api/clientProfiles
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('myVehicles', ['condition', 'make', 'model', 'manufactureYear'])
      .populate('myAppointments', [
        'scheduleDate',
        'scheduleTime',
        'isAttended',
      ])
      .populate('myOffers', ['amount', 'enteredDate']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/clientProfiles/:vehicle_id
// @desc    Add Profile
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('contact', 'Contact is required').not().isEmpty(),
      check('role', 'Role is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nic,
      name,
      email,
      contact,
      houseNo,
      streetName,
      city,
      role,
    } = req.body;

    const profileFields = {};

    // profileFields.vehicle = req.params.vehicle_id;

    if (nic) profileFields.nic = nic;
    if (name) profileFields.name = name;
    if (role) profileFields.role = role;
    if (email) profileFields.email = email;
    if (contact) profileFields.contact = contact;
    if (houseNo) profileFields.houseNo = houseNo;
    if (streetName) profileFields.streetName = streetName;
    if (city) profileFields.city = city;

    try {
      //Create record
      let profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/clientProfiles
// @desc    Update Profile
// @access  private
router.post(
  '/client_id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('contact', 'Contact is required').not().isEmpty(),
      check('role', 'Role is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const {
      nic,
      name,
      email,
      contact,
      houseNo,
      streetName,
      city,
      role,
    } = req.body;

    const profileFields = {};

    if (nic) profileFields.nic = nic;
    if (name) profileFields.name = name;
    if (role) profileFields.role = role;
    if (email) profileFields.email = email;
    if (contact) profileFields.contact = contact;
    if (houseNo) profileFields.houseNo = houseNo;
    if (streetName) profileFields.streetName = streetName;
    if (city) profileFields.city = city;

    try {
      let profile = await Profile.findOne({
        _id: req.params.client_id,
      });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { _id: req.params.client_id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/clientProfile
// @desc     Delete user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove User
    await Profile.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
