const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: String,
  firstName: String,
  lastName: String,
  otherName: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  dOB: Date,
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed']
  },
  email: {
    type: String,
    required: false,
  },
  contact: String,
  occupation: String,
  clinicId: String,
  checkIns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckIn',
  }],
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
