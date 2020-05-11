const express = require('express')
const router = express.Router()

// @route   POST api/employees
// @desc    employee route
// @access  Public
router.get('/', (req, res) => res.send('Employees route'))

module.exports = router
