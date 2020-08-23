const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Offer = require('../../models/Offer');
const Customer = require('../../models/OnlineCustomer');

// @route   POST api/offers/:vehicle_id
// @desc    Create/Update offers
// @access  private
router.post(
  '/:vehicle_id',
  [
    auth,
    [
      check('amount', 'Offer Amount is required').not().isEmpty(),
      check('contact', 'Contact No is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, contact, specialNotes } = req.body;

    const offerFields = {};

    const userId = req.user.id;
    offerFields.customer = userId;
    offerFields.vehicle = req.params.vehicle_id;

    if (amount) offerFields.amount = amount;
    if (contact) offerFields.contact = contact;
    if (specialNotes) offerFields.specialNotes = specialNotes;

    try {
      let offer = await Offer.findOne({
        _id: req.params.offer_id,
      });

      if (offer) {
        //Update
        offer = await Offer.findOneAndUpdate(
          { _id: req.params.offer_id },
          { $set: offerFields },
          { new: true }
        );
        return res.json(offer);
      }

      //Create record
      offer = new Offer(offerFields);
      await offer.save();

      res.json(offer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/offers/me
// @desc    View offers of logged in user
// @access  private
router.get('/my-offers', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const offers = await Offer.find({
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
    if (!offers) {
      return res.status(400).json({ msg: 'You have not made any Offers' });
    }
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Offers Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/offers/:client_id
// @desc    View offers of logged in user
// @access  private
router.get('/:client_id', auth, async (req, res) => {
  try {
    const offers = await Offer.find({
      customer: req.params.client_id,
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
    if (!offers) {
      return res.status(400).json({ msg: 'You have not made any Offers' });
    }
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Offers Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/offers
// @desc    View all offers
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const offers = await Offer.find()
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

    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/offers/:offer_id
// @desc    View an offer
// @access  private
router.get('/:offer_id', auth, async (req, res) => {
  try {
    const offer = await Offer.findOne({
      _id: req.params.offer_id,
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
    if (!offer) {
      return res.status(400).json({ msg: 'Offer Details Not Found' });
    }
    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Offer Not Found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
