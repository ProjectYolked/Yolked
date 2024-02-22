const Workout = require('../models/workout');
const logger = require("../../config/logger");
const WorkoutProgram = require("../models/workoutProgram");
const Exercise = require("../models/exercise"); // Import the Workout model
const User = require('../models/user');

const {error} = require("winston"); // Import the User model

// Controller function to get a workout by ID
exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('exercises');
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEmptyWorkout = async (req, res) => {
    const programId = req.params.programId;

    try {
        // Create a new Workout
        const newWorkout = new Workout({name: "New Workout", description: "", dateCompleted: null, exercises: []});
        await newWorkout.save();

        // Link the workout to the workout program
        await WorkoutProgram.findByIdAndUpdate(
            programId,
            { $push: { workouts: newWorkout._id } },
            { new: true, useFindAndModify: false }
        );

        // Link the workout to the user
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { workouts: newWorkout._id } },
            { new: true, useFindAndModify: false }
        );

        res.json({ id: newWorkout._id });
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error');
    }
};

exports.updateWorkout = async (req, res) => {
    const workoutId = req.params.workoutId;
    const updatedWorkoutData = req.body;

    try {
        const workout = await Workout.findByIdAndUpdate(workoutId, updatedWorkoutData, {
            new: true, // Returns the updated document
            runValidators: true // Runs validators on the updated data
        });

        if (!workout) {
            return res.status(404).json({message: 'Workout not found'});
        }

        res.json(workout);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: 'Error updating workout'});
        }
    }
}

exports.deleteWorkout = async (req, res) => {
    const { workoutId, programId } = req.params;

    try {
        // Find the workout to get its exercises
        const workout = await Workout.findById(workoutId);
        if (!workout) {
            return res.status(404).send('Workout not found');
        }

        // Delete all exercises associated with the workout
        await Exercise.deleteMany({ _id: { $in: workout.exercises } });

        // Remove the workout from the workout program
        await WorkoutProgram.findByIdAndUpdate(
            programId,
            { $pull: { workouts: workoutId } },
            { useFindAndModify: false }
        );

        // Delete the workout
        await workout.remove();

        res.status(200).send(`Workout and its exercises successfully deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.updateWorkout = async (req, res) => {
    const workoutId = req.params.workoutId;
    logger.info(workoutId)
    const { name, description } = req.body; // Destructure only the needed fields
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { name, description }, // Update only these fields
            { new: true }
        );
        res.json(updatedWorkout);
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error');
    }
}

exports.completeWorkout = async (req,  res) => {
    logger.info(`Completing workout for user with id ${req.user.id} and workout id ${req.params.workoutId}`);

    const workoutId = req.params.workoutId;

    try {
        const user = await User.findById(req.user.id);

        if(user.workouts === undefined || !user.workouts.includes(workoutId)){
            logger.error("User tried to complete another user's workout");
            return res.status(403).send("Unable to perform desired action");
        }

        const dateCompleted = Date.now();

        const newWorkout = await Workout.findOneAndUpdate(
            { _id: workoutId }, // Filter criteria
            { $set: { dateCompleted: dateCompleted } }, // Update operation
            { new: true }) // Set to true to return the updated document

        return res.json(newWorkout);
    } catch (error){
        logger.error(`Error completing workout object with id ${workoutId} ${error}`);
        res.status(500).send('Server error');
    }
}

exports.getWorkoutHistory = async (req, res) => {
    logger.info(`Fetching workout history for user with id ${req.user.id}`)
    const userId = req.user.id;
    const month = req.query.month;
    const year = req.query.year;

    try {
        const user = await User.findById(userId).populate('workouts');
        if (!user) {
            error(`Unable to find user with ID: ${req.params.id}`)
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate the start date (beginning of the specified or current month)
        const startDate = new Date();
        startDate.setDate(1); // Set to the first day of the month
        if (month !== undefined) {
            startDate.setMonth(month - 1); // Set to the specified custom month
        }

        // Calculate the end date (last day of the specified or current month)
        const endDate = new Date();
        endDate.setMonth((month !== undefined ? month : endDate.getMonth() + 1), 0);

        if(year !== undefined){
            startDate.setFullYear(year);
            endDate.setFullYear(year);
        }

        const filteredWorkouts = user.workouts.filter((workout) => {
            return workout.dateCompleted !== null &&
                workout.dateCompleted >= startDate &&
                workout.dateCompleted <= endDate;
        });

        return res.status(200).json(filteredWorkouts);

    } catch (error){
        logger.error(error);
        res.status(500).send('Server error');
    }
}


