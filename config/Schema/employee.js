const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: String,
  email: String,
  password: String,
  clinicId: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;