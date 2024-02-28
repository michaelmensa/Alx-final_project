const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  examination: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;
