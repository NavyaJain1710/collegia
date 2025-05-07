const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  try {
    const { name, roll, department } = req.body;
    const student = new Student({ name, roll, department });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add student' });
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;
