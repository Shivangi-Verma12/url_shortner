// Import required modules
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Controller for user registration
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.render('signup', { error: 'Username already exists, try another username' });
        }
        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.render('signup', { error: 'Email already registered, try another email' });
        }
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        return res.render('signup', { success: 'Registration successful! Please login.' });
    } catch (err) {
        return res.render('signup', { error: 'Registration failed. Please try again.' });
    }
}

// Controller for user login
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'incorrect password' });
        }
        res.redirect('/home');
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
}

// Export the controller functions
module.exports = {
    registerUser,
    loginUser
};
