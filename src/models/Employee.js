const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
