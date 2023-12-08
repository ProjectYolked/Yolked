const mongoose = require('mongoose');

const MuscleGroups = ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Core', 'Full Body'];

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Set',
        //Make sure there is at least one set in here

    }],
    muscleGroups: [{
        type: String,
        enum: MuscleGroups,
        required: true
    }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
