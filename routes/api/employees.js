const express = require('express');
const router = express.Router();

// @route   POST api/employees
// @desc    employee route
// @access  Public
router.post('/', (req, res) => res.send('Employees route'));

module.exports = router;
