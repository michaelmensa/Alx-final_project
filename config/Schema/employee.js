const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  role: String,
  email: String,
  password: String,
});

const Employee = new mongoose.model('employees', employeeSchema);

module.exports = Employee;
