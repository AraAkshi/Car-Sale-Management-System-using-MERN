const express = require('express');
const router = express.Router();

// @route   POST api/vehicles
// @desc    vehicle route
// @access  Public
router.post('/', (req, res) => res.send('Vehicles route'));

module.exports = router;
