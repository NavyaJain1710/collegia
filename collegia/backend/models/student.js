const mongoose = require("mongoose");

// Define the schema
const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  branch: String,
});

// Create and export the model
module.exports = mongoose.model("Student", studentSchema);
