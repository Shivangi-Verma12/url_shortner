// Import required modules
const express = require('express');
const { registerUser, loginUser } = require('../controller/user');

const router = express.Router();

// Route for user registration
router.post('/', registerUser);

// Route for user login
router.post('/login', loginUser);

// Export the router
module.exports = router;