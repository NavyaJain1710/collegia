const express = require("express");
const router = express.Router();
const Assignment = require("../models/AssignmentModel");

// CREATE
router.post("/", async (req, res) => {
    try {
        const { title, faculty, dueDate } = req.body;

        if (!title || !faculty) {
            return res.status(400).json({ error: "Title and Faculty are required" });
        }

        const newAssignment = new Assignment({ title, faculty, dueDate });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(500).json({ error: "Failed to create assignment" });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch assignments" });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const { title, faculty, dueDate } = req.body;

        if (!title || !faculty) {
            return res.status(400).json({ error: "Title and Faculty are required" });
        }

        const updated = await Assignment.findByIdAndUpdate(
            req.params.id,
            { title, faculty, dueDate },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: "Assignment not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update assignment" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Assignment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Assignment not found" });

        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete assignment" });
    }
});

module.exports = router;
