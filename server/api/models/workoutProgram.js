const mongoose= require('mongoose');
const { Schema } = mongoose;

const workoutDaySchema = new Schema({
    Monday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }],
    Tuesday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }],
    Wednesday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }],
    Thursday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }],
    Friday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }],
    Saturday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }],
    Sunday: [{ type: Schema.Types.ObjectId, ref: 'Workout', _id: false }]
}, { _id: false }); // Suppress _id for each day's array of workouts

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
    weeklySchedules: [workoutDaySchema],
}, {
    timestamps: true
});

const WorkoutProgram = mongoose.model('WorkoutProgram', workoutProgramSchema);

module.exports = WorkoutProgram;
