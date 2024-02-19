const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  phoneNumber: String,
  profession: String,
  clinicId: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
