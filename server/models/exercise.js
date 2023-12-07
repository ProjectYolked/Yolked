const mongoose = require('mongoose');

const MuscleGroups = ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Core', 'Full Body'];

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sets: {
        type: Number,
        required: true
    },
    repsPerSet: {
        type: Number,
        required: true
    },
    weightPerSet: {
        type: Number,
        required: false
    },
    muscleGroups: [{
        type: String,
        enum: MuscleGroups,
        required: true
    }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
