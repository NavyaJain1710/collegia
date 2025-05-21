const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  faculty: { type: String, required: true },
  dueDate: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
