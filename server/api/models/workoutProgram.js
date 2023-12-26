const mongoose = require('mongoose');

const workoutProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weeklySchedules: [
        {
            Monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
            Tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
            Wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
            Thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
            Friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
            Saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
            Sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
        }
    ]
}, {
    timestamps: true
});

const WorkoutProgram = mongoose.model('WorkoutProgram', workoutProgramSchema);

module.exports = WorkoutProgram;
