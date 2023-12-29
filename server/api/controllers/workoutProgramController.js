// File: /server/api/controllers/workoutProgramController.js

const WorkoutProgram = require('../models/workoutProgram');
const User = require('../models/user');
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
    logger.info(`creating program for user with ID: ${req.user.id}`);
    try {
        // Create a new WorkoutProgram
        const newProgram = new WorkoutProgram({
            name: "New Program",
            description: "",
            createdBy: req.user.id,
            weeklySchedules: []
        });

        await newProgram.save();
        logger.info(`new program ID ${newProgram._id}`);

        // Find the user by ID and update their programs list
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { programs: newProgram._id } },
            { new: true, useFindAndModify: false }
        );

        res.json({ id: newProgram._id });
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error');
    }
};

exports.updateWorkoutProgram = async (req, res) => {
    logger.info(`updating program with ID: ${req.params.id}`);
    try {
        const updatedWorkoutProgram = await WorkoutProgram.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, useFindAndModify: false }
        );

        if (!updatedWorkoutProgram) {
            return res.status(404).send('Workout Program not found');
        }

        res.status(200).json(updatedWorkoutProgram);
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error');
    }

}
