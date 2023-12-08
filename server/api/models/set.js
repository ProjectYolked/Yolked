const mongoose = require('mongoose');

const SetType = ['weightlifting', 'cardio']

const validateReps = value => this.type === 'weightlifting' ? value !== undefined : true;

const validateWeight = value => this.type === 'cardio' ? value === undefined : false;

const validateMinutes = value => this.type === 'cardio' ? value !== undefined : true;

const validateRepsMessage = 'Weight lifting sets must contain reps';

const validateWeightMessage = 'cardio cannot contain weight';

const validateMinutesMessage = 'Cardio must contain minutes';


//You can either have cardio with minutes or lifting with reps and weight with weight being optional
const setSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: SetType,
        required: true,
    },
    reps: {
        type: Number,
        validate: {
            validator: validateReps,
            message: validateRepsMessage
        }
    },
    weight: {
        type: Number,
        validate: {
            validator: validateWeight,
            message: validateWeightMessage
        }
    },
    minutes: {
        type: Number,
        validate: {
            validator: validateMinutes,
            message: validateMinutesMessage
        }
    }
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;