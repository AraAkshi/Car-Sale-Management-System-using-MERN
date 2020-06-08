const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Customer = require('../../models/Customer');

// @route   POST api/auth
// @desc    authenticate registered client
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select(
      '-password'
    );
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Customer.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Email or Password. Please try again!' }],
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Email or Password. Please try again!' }],
        });
      }

      //Return JWT
      const payload = {
        user: {
          id: user.id, //id is the payload
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
