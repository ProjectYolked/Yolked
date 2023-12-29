const Exercise = require('../models/exercise');
const logger = require("../../config/logger");
const Workout = require("../models/workout");

// Controller function to post an exercise
exports.createExercise = async (req, res) => {
    const workoutId = req.params.workoutId;
    logger.info("workoutId:", workoutId);

    try {
        // Create a new Exercise
        const newExercise = new Exercise(req.body);
        await newExercise.save();
        logger.info('Exercise saved with ID:', newExercise);

        // Update the Workout by adding the new Exercise's ID
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { $push: { exercises: newExercise._id } },
            { new: true, useFindAndModify: false }
        );

        if (!updatedWorkout) {
            return res.status(404).send('Workout not found');
        }

        res.status(200).json(newExercise);
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error');
    }
};

exports.updateExercise = async (req, res) => {
    const exerciseId = req.params.exerciseId;

    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            exerciseId,
            req.body,
            { new: true, useFindAndModify: false }
        );

        if (!updatedExercise) {
            return res.status(404).send('Exercise not found');
        }

        res.status(200).json(updatedExercise);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.deleteExercise = async (req, res) => {
    const { exerciseId, workoutId } = req.params;

    try {
        // Delete the exercise
        const exercise = await Exercise.findByIdAndDelete(exerciseId);
        if (!exercise) {
            return res.status(404).send('Exercise not found');
        }

        // Remove the exercise reference from the workout
        await Workout.findByIdAndUpdate(
            workoutId,
            { $pull: { exercises: exerciseId } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).send(`Exercise with ID ${exerciseId} removed from workout and deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
