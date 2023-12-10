// File: /server/api/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET request to fetch a specific user by ID
router.get('/user/:id', userController.getUserById);
// POST request for user login
router.post('/login', userController.loginUser);

module.exports = router;
