const mongoose = require("mongoose");
const env = require("./environment");
//connnect to database
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDb"));

//once database is open
db.once("open", function () {
  console.log("Connected to database::MongoDb");
});

module.exports = db;
