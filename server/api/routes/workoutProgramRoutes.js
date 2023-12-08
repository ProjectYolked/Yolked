const express = require('express');
const router = express.Router();
const workoutProgramController = require('../controllers/workoutProgramController');

// GET request to fetch a specific workout program by ID
router.get('/workoutProgram/:id', workoutProgramController.getWorkoutProgramById);

module.exports = router;
