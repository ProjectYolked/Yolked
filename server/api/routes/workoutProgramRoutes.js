const express = require('express');
const router = express.Router();
const workoutProgramController = require('../controllers/workoutProgramController');
const authenticateToken = require("../../utils/middleware/auth");

// GET request to fetch a specific workout program by ID
router.get('/workout-program/:id', workoutProgramController.getWorkoutProgramById);

router.get('/draft-workout-program/:id', authenticateToken, workoutProgramController.getWorkoutProgramById);

router.post('/workout-program', authenticateToken, workoutProgramController.createEmptyProgram);

//PUT request to update a workout program
router.put('/workout-program/:id', authenticateToken, workoutProgramController.updateWorkoutProgram);

module.exports = router;
