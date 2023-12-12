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
};

// Controller function to sign up
exports.signUpUser = async function signUpUser(req, res) {
    // Destructure and validate the incoming data
    const { email, username, password, firstName, lastName } = req.body;
    if (!email || !username || !firstName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const lowerCaseUserName = username.toLowerCase();
        const lowerCaseEmail = email.toLowerCase();

        // Check if username already exists
        let user = await User.findOne({ username: lowerCaseUserName });
        if (user) {
            return res.status(403).send('Username already taken!');
        }

        // Check if email already exists
        user = await User.findOne({ email: lowerCaseEmail });
        if (user) {
            return res.status(403).send('An account with this email already exists!');
        }
        // Create a new user instance
        const newUser = new User({
            email: lowerCaseEmail,
            username: lowerCaseUserName,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created', username });

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
};
