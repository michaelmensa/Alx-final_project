const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: String,
  firstName: String,
  lastName: String,
  gender: String,
  phoneNumber: String,
  profession: String,
  clinicId: String,
  checkIns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckIn',
  }],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
