// File: /server/api/controllers/workoutProgramController.js

const WorkoutProgram = require('../models/workoutProgram');
const Workout = require('../models/workout')
const User = require('../models/user');
const logger = require('../../config/logger');

// Controller to get a workout program by ID with populated workouts for each day
exports.getWorkoutProgramById = async (req, res) => {
    logger.info(`getting program id: ${req.params.id}`);
    try {
        const workoutProgramId = req.params.id; // Assuming the ID is passed in the URL
        let workoutProgram = await WorkoutProgram.findById(workoutProgramId);

        if (!workoutProgram) {
            return res.status(404).json({ message: 'Workout Program not found' });
        }

        // Clone the workoutProgram object to modify it without affecting the original document
        workoutProgram = JSON.parse(JSON.stringify(workoutProgram));

        // Dynamically populate each day of the week with workout details
        for (const week of workoutProgram.weeklySchedules) {
            for (const day in week) {
                // Ensure 'day' is actually a day of the week in your schema before populating
                if (week.hasOwnProperty(day)) {
                    // Populate each day with the corresponding workouts
                    week[day] = await Promise.all(
                        week[day].map(async (workoutId) =>
                            Workout.findById(workoutId).populate('exercises')
                        )
                    );
                }
            }
        }

        res.json(workoutProgram);
    } catch (error) {
        console.error('Failed to get workout program', error);
        res.status(500).json({ message: 'Failed to get workout program', error: error.message });
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
        logger.info(`new program created: ${newProgram}`);

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
