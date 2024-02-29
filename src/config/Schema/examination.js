const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  clinicId: String,
  complaint: { type: String, required: false },
  va: { type: String, required: false },
  antExam: { type: String, required: false },
  postExam: { type: String, required: false },
  refraction: { type: String, required: false },
  diagnosis: { type: String, required: false },
  medication: { type: String, required: false },
  lens: { type: String, required: false },
}, { timestamps: true });

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;
