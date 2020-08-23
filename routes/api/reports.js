const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const pdf = require('html-pdf');
const { check, validationResult } = require('express-validator');

const saleReport = require('../../reports/salesReport');

const Report = require('../../models/Report');

// @route   POST api/reports/sale-report
// @desc    Create Sale Report
// @access  private
router.post('/sale-report', (req, res) => {
  pdf.create(saleReport(req.body), {}).toFile('saleReport.pdf', err => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

// @route   GET api/reports/sale-report
// @desc    Create Sale Report
// @access  private
router.get('/sale-report', (req, res) => {
  res.sendFile(`/saleReport.pdf`);
});

// @route   POST api/reports
// @desc    Create Report
// @access  private
router.post(
  '/',
  [
    check('reportType', 'Report Type is required').not().isEmpty(),
    check('startDate', 'Start Date is required').not().isEmpty(),
    check('endDate', 'End Date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reportType, startDate, endDate } = req.body;

    const reportFields = {};

    let dateObj = new Date();
    let date = ('0' + dateObj.getDate()).slice(-2);
    let month = ('0' + dateObj.getMonth()).slice(-2);
    let year = dateObj.getFullYear();
    reportFields.generatedDate = year + '-' + month + '-' + date;

    if (reportType) reportFields.reportType = reportType;
    if (startDate) reportFields.startDate = startDate;
    if (endDate) reportFields.endDate = endDate;

    try {
      //Create record
      let report = new Report(reportFields);
      await report.save();

      res.json(report);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/reports
// @desc    View all reports
// @access  public
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/reports/:report_id
// @desc    View a report
// @access  public
router.get('/:report_id', async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.report_id,
    });
    if (!report) {
      return res.status(400).json({ msg: 'Report Details Not Found' });
    }
    res.json(report);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Report Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/reports/:report_id
// @desc     Delete report
// @access   Private
router.delete('/:report_id', auth, async (req, res) => {
  try {
    await Report.findOneAndRemove({ _id: req.params.report_id });
    res.json({ msg: 'Report deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/reports/:report_id
// @desc    Update Report
// @access  public
router.put(
  '/:report_id',
  [
    check('reportType', 'Report Type is required').not().isEmpty(),
    check('startDate', 'Start Date is required').not().isEmpty(),
    check('endDate', 'End Date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reportType, startDate, endDate, report, specialNotes } = req.body;

    const reportFields = {};

    if (reportType) reportFields.reportType = reportType;
    if (startDate) reportFields.startDate = startDate;
    if (endDate) reportFields.endDate = endDate;
    if (specialNotes) reportFields.specialNotes = specialNotes;
    try {
      let report = await Report.findOne({
        _id: req.params.report_id,
      });

      if (report) {
        //Update
        report = await Report.findOneAndUpdate(
          { _id: req.params.report_id },
          { $set: reportFields },
          { new: true }
        );
        return res.json(report);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
