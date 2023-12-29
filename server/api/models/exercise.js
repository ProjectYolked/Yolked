const mongoose = require('mongoose');
const setSchema = require("./set");

const MuscleGroups = ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Core', 'Full Body'];

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sets: [setSchema], // Embed the setSchema directly
    muscleGroups: [{
        type: String,
        enum: MuscleGroups,
        required: true
    }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
