const mongoose = require('mongoose');
const User = require("../server/api/models/user");
const WorkoutProgram = require("../server/api/models/workoutProgram");
const Workout = require("../server/api/models/workout");
const Exercise = require("../server/api/models/exercise");
const connectDB = require("../server/config/db");


connectDB()

// Create and Save a New User with a Workout Plan
async function createUserWithWorkout() {
    // Create a new user
    const user = new User({
        username: 'johndoe',
        email: 'john@example.com',
        password: 'hashedPassword' // Ensure this is hashed
    });

    // Save the user
    await user.save();

    // Create a new workout program
    const workoutProgram = new WorkoutProgram({
        name: 'My First Workout Program',
        description: 'This is a test workout program.',
        createdBy: user._id
    });

    // Create a new workout
    const workout = new Workout({
        name: 'Day 1: Chest and Arms',
        date: new Date()
    });

    // Create some exercises
    const pushups = new Exercise({
        name: 'Pushups',
        muscleGroup: 'Chest',
        sets: 3,
        repsPerSet: 10,
        weightPerSet: null
    });

    const curls = new Exercise({
        name: 'Bicep Curls',
        muscleGroup: 'Arms',
        sets: 3,
        repsPerSet: 12,
        weightPerSet: 20 // lbs
    });

    // Save exercises
    await pushups.save();
    await curls.save();

    // Add exercises to the workout
    workout.exercises.push(pushups._id);
    workout.exercises.push(curls._id);

    // Save the workout
    await workout.save();

    // Add the workout to the workout program
    workoutProgram.weeklySchedule.Monday.push(workout._id);

    // Save the workout program
    await workoutProgram.save();

    console.log('User, workout program, and workout created successfully.');
}

// Run the function
createUserWithWorkout()
    .then(() => mongoose.disconnect())
    .catch(err => console.error(err));
