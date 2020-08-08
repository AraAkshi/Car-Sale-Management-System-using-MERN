const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Inquiry = require('../../models/Inquiry');

// @route   POST api/inquiries
// @desc    Create/Update Inquiry
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('contact', 'Contact is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, contact, email, make, model, specialNotes } = req.body;

    const inquiryFields = {};

    inquiryFields.vehicle = req.params.vehicle_id;

    if (name) inquiryFields.name = name;
    if (contact) inquiryFields.contact = contact;
    if (email) inquiryFields.email = email;
    if (make) inquiryFields.make = make;
    if (model) inquiryFields.model = model;
    if (specialNotes) inquiryFields.specialNotes = specialNotes;

    try {
      let inquiry = await Inquiry.findOne({
        _id: req.params.inquiry_id,
      });

      if (inquiry) {
        //Update
        inquiry = await Inquiry.findOneAndUpdate(
          { _id: req.params.inquiry_id },
          { $set: inquiryFields },
          { new: true }
        );
        return res.json(inquiry);
      }

      //Create record
      inquiry = new Inquiry(inquiryFields);
      await inquiry.save();

      res.json(inquiry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/inquiries
// @desc    View all inquiries
// @access  public
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/inquiries/:inquiry_id
// @desc    View an inquiry
// @access  public
router.get('/:inquiry_id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findOne({
      _id: req.params.inquiry_id,
    });
    if (!inquiry) {
      return res.status(400).json({ msg: 'Inquiry Details Not Found' });
    }
    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Inquiry Not Found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
