const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    sessions: { type: Number, required: true },
    credits: { type: Number, required: true },
    faculty: { type: String, required: true },
    area: { type: String, required: true },
    nextLecture: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema, 'courses'); // Ensure collection name is 'courses'
