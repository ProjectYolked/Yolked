const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model

// Controller function to get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.id}).populate('programs');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to log in user
exports.loginUser = async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('User not found');
        }

        // Compare provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // User is authenticated, continue with login process
        const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret key
        res.send({ token });

    } catch (error) {
        res.status(500).send('Server error');
    }
}
// Add more controller functions as needed for other user operations
