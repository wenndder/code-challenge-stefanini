const mongoose = require('mongoose');
const Employee = require('./src/models/Employee');

const mongoDb =
  'mongodb+srv://wenndder:87912109aA@cluster0.ckq8alv.mongodb.net/?retryWrites=true&w=majority';

module.exports.getEmployee = (event, context, callback) => {
  dbConnectAndExecute(mongoDb, () =>
    Employee.find({ _id: event.pathParameters.id })
      .then((employee) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(employee, null, 2),
        })
      )
      .catch((err) => {
        throw err;
      })
  );
};

module.exports.createEmployee = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const employee = new Employee({
    name: data.name,
    age: data.age,
    role: data.role,
  });

  dbConnectAndExecute(mongoDb, () =>
    employee
      .save()
      .then(() =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(employee, null, 2),
        })
      )
      .catch((err) => {
        throw err;
      })
  );
};

module.exports.deleteEmployee = (event, context, callback) => {
  dbConnectAndExecute(mongoDb, () =>
    Employee.remove({ _id: event.pathParameters.id })
      .then(() =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify('Employee Deleted!'),
        })
      )
      .catch((err) => {
        throw err;
      })
  );
};

module.exports.updateEmployee = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const employee = new Employee({
    name: data.name,
    age: data.age,
    role: data.role,
  });

  dbConnectAndExecute(mongoDb, () =>
    Employee.findByIdAndUpdate(id, employee)
      .then(() =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(employee, null, 2),
        })
      )
      .catch((err) => {
        throw err;
      })
  );
};

function dbConnectAndExecute(dbUrl, fn) {
  const db = mongoose.connect(dbUrl, { useMongoClient: true });
  return db.then(fn).finally(() => db.close());
}
