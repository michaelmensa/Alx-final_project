const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  clinicName: String,
  clinicEmail: String,
  clinicPassword: String,
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
