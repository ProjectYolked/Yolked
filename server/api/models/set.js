const mongoose = require('mongoose');

const SetType = ['weightlifting', 'cardio']

const validateReps = function(value) {
    return this.type === 'weightlifting' ? value !== undefined : true;
};

const validateSeconds = function(value) {
    return this.type === 'cardio' ? value !== undefined : true;
};

const validateRepsMessage = 'Weight lifting sets must contain reps';

const validateMinutesMessage = 'Cardio must contain minutes';

//You can either have cardio with minutes or lifting with reps and weight with weight being optional
//why not have cardio with weight ie weighted planks or a weight vest. removing weight validation.
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
    },
    seconds: {
        type: Number,
        validate: {
            validator: validateSeconds,
            message: validateMinutesMessage
        }
    }
});

module.exports = setSchema;
