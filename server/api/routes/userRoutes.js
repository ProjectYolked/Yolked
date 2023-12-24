const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require("../../utils/middleware/auth");

// GET request to fetch a specific user by ID
router.get('/user/profile', authenticateToken, userController.getUserProfile);

router.get('/user/:id', userController.getUserById);

// POST request for user login
router.post('/login', userController.loginUser);
// POST request for user signup
router.post('/signup', userController.signUpUser);

module.exports = router;
