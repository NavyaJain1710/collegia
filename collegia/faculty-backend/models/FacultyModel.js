const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    facultyId: { type: Number, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Faculty', FacultySchema);
