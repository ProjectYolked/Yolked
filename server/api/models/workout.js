const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
