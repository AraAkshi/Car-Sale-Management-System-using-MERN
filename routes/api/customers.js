const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Customer = require('../../models/Customer');

// @route   POST api/customers
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      houseNo,
      streetName,
      city,
      contact,
      password,
    } = req.body;

    //Check if user already exists
    try {
      let customer = await Customer.findOne({ email });

      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists!' }] });
      }

      customer = new Customer({
        name,
        email,
        houseNo,
        streetName,
        city,
        contact,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(password, salt);

      await customer.save();

      //Return JWT
      const payload = {
        customer: {
          id: customer.id, //id is in the payload
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
