const Workout = require('../models/workout');
const logger = require("../../config/logger");
const WorkoutProgram = require("../models/workoutProgram");
const Exercise = require("../models/exercise"); // Import the Workout model

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
        const newWorkout = new Workout({name: "New Workout", description: "", exercises: []});
        await newWorkout.save();

        // Link the workout to the workout program
        await WorkoutProgram.findByIdAndUpdate(
            programId,
            { $push: { workouts: newWorkout._id } },
            { new: true, useFindAndModify: false }
        );

        res.json({ id: newWorkout._id });
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error');
    }
};

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
    const workoutId = req.params;
    const workout = req.body;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            workout,
            { new: true }
        );
        res.json(updatedWorkout);
    } catch (error) {
        res.status(400).send(error);
    }
}
