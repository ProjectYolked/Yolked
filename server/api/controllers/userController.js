const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model
const logger = require('../../config/logger');

// Controller function to get a user by ID
exports.getUserById = async (req, res) => {
    logger.info(`Fetching user with ID: ${req.params.id}`);
    try {
        const user = await User.findOne({ username: req.params.id }).populate('programs');

        if (!user) {
            logger.error(`Unable to find user with ID: ${req.params.id}`)
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to log in user
exports.loginUser = async function loginUser(req, res) {
    logger.info(`logging user in with ID: ${req.body.identifier}`);
    const { identifier, password, rememberMe } = req.body; // 'identifier' can be either username or email

    try {
        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isEmail = emailRegex.test(identifier);
        const query = isEmail ? { email: identifier } : { username: identifier };

        const user = await User.findOne(query);

        if (!user) {
            return res.status(401).send('Username or Password incorrect');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Username or Password incorrect');
        }

        const expiresIn = rememberMe ? '30d' : '2h'; // 30 days vs 2 hours
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn });
        // Send the token back to the client
        res.json({ token });
    } catch (error) {
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to sign up
exports.signUpUser = async function signUpUser(req, res) {
    // Destructure and validate the incoming data
    const { email, username, password, firstName, lastName } = req.body;
    if (!email || !username || !firstName || !password) {
        logger.warn('Not all fields found for sign up');
        return res.status(400).json({ message: 'All fields are required' });
    }

    logger.info(`Signing user up with user name ${req.body.username}`)

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
        logger.error(error)
        res.status(500).send('Server error');
    }
};
