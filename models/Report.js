const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reportType: {
    type: String,
  },
  duration: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  },
  generatedDate: {
    type: Date,
    default: Date.now,
  },
  report: {
    type: String,
  },
});

module.exports = Report = mongoose.model('reports', ReportSchema);
