require("dotenv").config();
const { dbConnectAndExecute } = require("../../handler");
const Employee = require("../../models/Employee");

module.exports.createEmployee = async (data) => {
  const convertedData = JSON.parse(JSON.stringify(data)).body;

  const employee = new Employee({
    name: convertedData.name,
    age: convertedData.age,
    role: convertedData.role,
  });

  return dbConnectAndExecute(process.env.MONGO_URL, () =>
    employee.save()
  ).catch((err) => {
    throw new Error(err);
  });
};