const mongoose = require('mongoose');
const User = require("../server/api/models/user");
const WorkoutProgram = require("../server/api/models/workoutProgram");
const Workout = require("../server/api/models/workout");
const Exercise = require("../server/api/models/exercise");
const Set = require("../server/api/models/set")
const connectDB = require("../server/config/db");


connectDB()

// Create and Save a New User with a Workout Plan
async function createUserWithWorkout() {
    // Create a new user
    const user = new User({
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password' // Ensure this is hashed
    });

    // Create a new workout program
    const workoutProgram = new WorkoutProgram({
        name: 'My First Workout Program',
        description: 'This is a test workout program.',
        createdBy: user._id
    });

    // Save the user
    user.programs.push(workoutProgram._id);
    await user.save();

    // Create a new workout
    const workout = new Workout({
        name: 'Day 1: Chest and Arms',
        date: new Date()
    });

    // Create some exercises
    const pushups = new Exercise({
        name: 'Pushups',
        muscleGroup: 'Chest',
    });

    const curls = new Exercise({
        name: 'Bicep Curls',
        muscleGroup: 'Arms',
    });

    const planks = new Exercise({
        name: 'planks',
        muscleGroup: 'Core',
    });
    for (let i = 0; i < 3; i++) {
        const plankSet = new Set({
            type: 'cardio',
            seconds: 60
        })
        await plankSet.save()
        planks.sets.push(plankSet._id);

        const curlSet = new Set({
            type: 'weightlifting',
            weight: 30,
            reps: 12
        })
        await curlSet.save()
        curls.sets.push(curlSet._id);

        const pushupSet = new Set({
            type: 'weightlifting',
            weight: 10,
            reps: 12
        })
        await pushupSet.save()
        pushups.sets.push(pushupSet._id);
    }

    // Save exercises
    await pushups.save();
    await curls.save();
    await planks.save();

    // Add exercises to the workout
    workout.exercises.push(pushups._id);
    workout.exercises.push(curls._id);

    // Save the workout
    await workout.save();

    // Add the workout to the workout program
    workoutProgram.weeklySchedule.Monday.push(workout._id);

    // Save the workout program
    await workoutProgram.save();

    console.log('User, workout program, workout, exercise, and set created successfully.');
}

// Run the function
createUserWithWorkout()
    .then(() => mongoose.disconnect())
    .catch(err => {
        console.error(err)
        mongoose.connection.db.dropDatabase()
            .then(() => {
                console.log('Database dropped successfully!');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error dropping database:', err);
                mongoose.connection.close();
            });

    });
