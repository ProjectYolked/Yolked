// File: /server/api/controllers/workoutProgramController.js

const WorkoutProgram = require('../models/workoutProgram');
const logger = require('../../config/logger');

// Controller function to get a workout program by ID
exports.getWorkoutProgramById = async (req, res) => {
    logger.info(`fetching workout program with Id ${req.params.id}`)
    try {
        const workoutProgram = await WorkoutProgram.findById(req.params.id);

        if (!workoutProgram) {
            return res.status(404).json({ message: 'Workout Program not found' });
        }

        // Assuming your 'WorkoutProgram' model's 'weeklySchedule' is an array of objects
        // where each object has days of the week as keys with ObjectId references to 'Workout' model
        for (const week of workoutProgram.weeklySchedules) {
            for (const day in week) {
                await WorkoutProgram.populate(week, { path: `${day}`, model: 'Workout' });
            }
        }

        res.json(workoutProgram);
    } catch (error) {
        res.status(500).json({ message: error.message });
        logger.error(error)
    }
};


exports.createEmptyProgram = async (req, res) => {
    logger.info(`creating program for user with ID: ${req.user.id}`)
    try {
        const newProgram = new WorkoutProgram({
            name: "New Program",
            description: "",
            createdBy: req.user.id,
            weeklySchedules: []
        });
        await newProgram.save();
        logger.info(`new program ID ${newProgram._id}`)
        res.json({ id: newProgram._id });
    } catch (error) {
        logger.error(error)
        res.status(500).send('Server error');
    }
};
