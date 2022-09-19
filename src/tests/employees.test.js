const mongoose = require("mongoose");

const {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../routes/employees");

test("Create a new employee", async () => {
  const employee = await createEmployee({
    "body": {
      "name": "Rita",
      "age": "31",
      "role": "Assistant",
    },
  });

  expect(employee.name).toEqual("Rita");
  expect(employee.age).toEqual(31);
  expect(employee.role).toEqual("Assistant");
});

test("Tries to create a new employee without all required parameters", async () => {
  try {
    await createEmployee({
      "body": {
        "name": "Rita",
        "role": "Assistant",
      },
    });
  } catch (error) {
    expect(error.message).toEqual(
      "ValidationError: age: Path `age` is required."
    );
  }
});

test("Recover a employee with Get employee", async () => {
  const employee = await createEmployee({
    "body": {
      "name": "Maria",
      "age": "70",
      "role": "CEO",
    }
  });

  const recoveredEmployee = await getEmployee({
    "body":
      { "_id": `${employee._id}` }
  });

  expect(employee.name).toEqual(recoveredEmployee.name);
  expect(employee.age).toEqual(recoveredEmployee.age);
  expect(employee.role).toEqual(recoveredEmployee.role);
});

test("Tries to get an employee that does not exist", async () => {  
  const recoveredEmployee = await getEmployee({
    "body":
      { "_id": new mongoose.Types.ObjectId() }
  });
  
  expect(recoveredEmployee).toBeNull();
});

test("Update a employee and assert with Get employee", async () => {
  const employee = await createEmployee({
    "body": {
      "name": "Douglas",
      "age": "24",
      "role": "Developer",
    }
  });

  const updatedEmployee = await updateEmployee({
    "body": {
      "_id": `${employee._id}`,
      "name": "Douglas Wender",
      "age": "25",
      "role": "Engineer",
    }
  });

  const recoveredEmployee = await getEmployee({
    "body":
      { "_id": `${employee._id}` }
  });

  expect(updatedEmployee.name).toEqual(recoveredEmployee.name);
  expect(updatedEmployee.age).toEqual(recoveredEmployee.age);
  expect(updatedEmployee.role).toEqual(recoveredEmployee.role);
});

test("Tries to update an employee that does not exist", async () => {
  const updatedEmployee = await updateEmployee({
    "body": {
      "_id": `${new mongoose.Types.ObjectId()}`,
      "name": "Douglas Wender",
      "age": "25",
      "role": "Engineer",
    }
  });

  expect(updatedEmployee).toBeNull();
});

test("Delete a employee and assert with Get employee", async () => {
  const employee = await createEmployee({
    "body": {
      "name": "José",
      "age": "57",
      "role": "RH",
    }
  });

  await deleteEmployee({ "body": { "_id": `${ employee._id }` }});

  const recoveredEmployee = await getEmployee({ "body": { "_id": `${employee._id}` } });

  expect(recoveredEmployee).toBeNull();
});

test("Tries to delete an employee that does not exist", async () => {
  const employeRemoved = await deleteEmployee({
    "body": {
      "_id": `${new mongoose.Types.ObjectId()}`,
    }
  });

  expect(employeRemoved.deletedCount).toEqual(0);
});
