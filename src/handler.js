require("dotenv").config();
const mongoose = require("mongoose");

module.exports.dbConnectAndExecute = (dbUrl, fn) => {
  return dbExecute(mongoose.connect(dbUrl, {}), fn);
};

const dbExecute = (db, fn) => db.then(fn);