const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const authenticateToken = require("../../utils/middleware/auth");
const {validateMonthQueryParam, validateYearQueryParam} = require("../../utils/middleware/queryValidation");

// GET request to fetch a specific workout by ID
router.get('/workout/:id', workoutController.getWorkoutById);

// POST request to create a new workout
router.post('/create-workout/:programId', authenticateToken, workoutController.createEmptyWorkout);

// PUT request to update a workout
router.put('/workout/:workoutId', authenticateToken, workoutController.updateWorkout);

// DELETE a workout
router.delete('/workout/:id', authenticateToken, workoutController.deleteWorkout);

router.get('/workout-history', authenticateToken, validateMonthQueryParam, validateYearQueryParam, workoutController.getWorkoutHistory);

router.post('/workout/:workoutId/complete', authenticateToken, workoutController.completeWorkout);

module.exports = router;
