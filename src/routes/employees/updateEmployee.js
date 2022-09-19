require("dotenv").config();
const { dbConnectAndExecute } = require("../../handler");
const Employee = require("../../models/Employee");

module.exports.updateEmployee = (data) => {
  const convertedData = JSON.parse(JSON.stringify(data)).body;

  const employee = new Employee({
    _id: convertedData._id,
    name: convertedData.name,
    age: convertedData.age,
    role: convertedData.role,
  });

  return dbConnectAndExecute(process.env.MONGO_URL, () =>
    Employee.findByIdAndUpdate(employee._id, employee, { new: true }).catch(
      (err) => {
        throw new Error(err);
      }
    )
  );
};
