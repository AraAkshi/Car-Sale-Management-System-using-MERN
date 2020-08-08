const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const Employee = require('../../models/Employee');

// @route   POST api/employees
// @desc    Add/Update employees
// @access  Public
router.post(
  '/',
  [
    check('nic', 'Please enter a valid NIC number').isLength({ min: 10 }),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 5 }),
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
      address,
      contact,
      designation,
      password,
    } = req.body;

    try {
      employee = new Employee({
        nic,
        name,
        email,
        address,
        contact,
        designation,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(password, salt);

      await employee.save();

      //Return JWT
      const payload = {
        employee: {
          id: employee.id,
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

// @route    GET api/employees/:user_id
// @desc     Get employee by user ID
// @access   Public
router.get(
  '/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const employee = await Employee.findOne({
        _id: user_id,
      });

      if (!employee) return res.status(400).json({ msg: 'Employee not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    GET api/employees
// @desc     Get all employees
// @access   Public
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/employee
// @desc     Delete user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove User
    await Employee.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
