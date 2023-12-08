const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// GET request to fetch a specific workout by ID
router.get('/workout/:id', workoutController.getWorkoutById);

module.exports = router;
