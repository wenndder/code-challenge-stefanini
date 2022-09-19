require("dotenv").config();
const { dbConnectAndExecute } = require("../../handler");
const Employee = require("../../models/Employee");

module.exports.deleteEmployee = (data) => {
  const convertedData = JSON.parse(JSON.stringify(data)).body;

  return dbConnectAndExecute(process.env.MONGO_URL, () =>
    Employee.remove({ _id: convertedData._id })
  ).catch((err) => {
    throw new Error(err);
  });
};
