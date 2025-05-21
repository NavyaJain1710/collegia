const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  code: { type: String, required: true },
  course: { type: String, required: true },
  count: { type: String, required: true },
  date: { type: Date, default: Date.now },
  subject: String,
  section: String
});

module.exports = mongoose.model('Attendance', attendanceSchema);
