const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reportType: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  generatedDate: {
    type: String,
  },
});

module.exports = Report = mongoose.model('reports', ReportSchema);
