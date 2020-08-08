const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const Profile = require('../../models/Customer');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.user.id,
    })
      .populate('myVehicles', ['condition', 'make', 'model', 'manufactureYear'])
      .populate('myAppointments', [
        'scheduleDate',
        'scheduleTime',
        'isAttended',
      ])
      .populate('myOffers', ['amount', 'enteredDate']);

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profiles/:user_id
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

// @route    GET api/profile
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

// @route   POST api/profiles
// @desc    Update Profile
// @access  private
router.post('/', auth, async (req, res) => {
  const { name, email, contact, houseNo, streetName, city } = req.body;

  const profileFields = {};

  if (name) profileFields.name = name;
  if (email) profileFields.email = email;
  if (contact) profileFields.contact = contact;
  if (houseNo) profileFields.houseNo = houseNo;
  if (streetName) profileFields.streetName = streetName;
  if (city) profileFields.city = city;

  try {
    let profile = await Profile.findOne({
      _id: req.user.id,
    });

    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { _id: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
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
