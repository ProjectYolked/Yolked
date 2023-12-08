const Workout = require('../models/workout'); // Import the Workout model

// Controller function to get a workout by ID
exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('exercises');
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
