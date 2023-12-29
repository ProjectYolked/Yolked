const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const authenticateToken = require("../../utils/middleware/auth");

// GET request to fetch a specific workout by ID
router.get('/workout/:id', workoutController.getWorkoutById);

// POST request to create a new workout
router.post('/create-workout/:programId', authenticateToken, workoutController.createEmptyWorkout);

// Endpoint to delete a workout
router.delete('/workout/:id', authenticateToken, workoutController.deleteWorkout);

module.exports = router;
