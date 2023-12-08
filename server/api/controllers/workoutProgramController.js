// File: /server/api/controllers/workoutProgramController.js

const WorkoutProgram = require('../models/workoutProgram'); // Import the WorkoutProgram model

// Controller function to get a workout program by ID
exports.getWorkoutProgramById = async (req, res) => {
    try {
        const workoutProgram = await WorkoutProgram.findById(req.params.id)
            .populate({
                path: 'weeklySchedule.Monday weeklySchedule.Tuesday weeklySchedule.Wednesday weeklySchedule.Thursday weeklySchedule.Friday weeklySchedule.Saturday weeklySchedule.Sunday',
                model: 'Workout'
            });

        if (!workoutProgram) {
            return res.status(404).json({ message: 'Workout Program not found' });
        }
        res.json(workoutProgram);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
