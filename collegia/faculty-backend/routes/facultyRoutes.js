const express = require('express');
const router = express.Router();
const Faculty = require('../models/FacultyModel');

// Create Faculty
router.post('/add', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        await newFaculty.save();
        res.json(newFaculty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Faculty
router.get('/all', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Faculty
router.put('/update/:id', async (req, res) => {
    try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFaculty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Faculty
router.delete('/delete/:id', async (req, res) => {
    try {
        await Faculty.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
