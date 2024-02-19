const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  clinicName: String,
  clinicEmail: String,
  clinicPassword: String,
});

const Clinic = new clinicSchema.model('clinics', clinicSchema);

module.exports = Clinic;
