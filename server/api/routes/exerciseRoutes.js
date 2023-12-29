const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const authenticateToken = require("../../utils/middleware/auth");

// POST request to create a new exercise and add it to a workout
router.post('/exercise/:workoutId', authenticateToken, exerciseController.createExercise);

// Endpoint to update an exercise
router.put('/exercise/:exerciseId', authenticateToken, exerciseController.updateExercise);

// Endpoint to delete an exercise
router.delete('/exercise/:exerciseId/:workoutId', authenticateToken, exerciseController.deleteExercise);

module.exports = router;
