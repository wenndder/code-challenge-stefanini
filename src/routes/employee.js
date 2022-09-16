const express = require('express');
const employeeModel = require('../models/Employee');
const app = express();

app.post('/', async (request, response) => {
  const data = JSON.parse(request.body);

  const employee = new employeeModel({
    name: data.name,
    age: data.age,
    role: data.role,
  });

  try {
    await employee.save();
    response.send(employee);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/:id', async (request, response) => {
  const employeeId = request.params.id;
  const employee = await employeeModel.findOne({ $where: { id: employeeId } });

  try {
    response.send(employee);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
