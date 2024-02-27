const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeID: String,
  firstName: String,
  lastName: String,
  otherName: {
    type: String,
    required: false,
  },
  dob: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  contact: String,
  role: String,
  email: String,
  password: String,
  clinicId: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
