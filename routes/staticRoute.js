const express = require('express');
const URL = require('../models/url'); // Import the URL model
const { restrictToLoggedinUserOnly } = require('../middlewares/auth'); // Import the middleware

const router = express.Router(); // Create a new router

router.get('/home', restrictToLoggedinUserOnly, async (req, res) => {
    const urls = await URL.find({ createdBy: req.user._id }); // Fetch all URLs for display
    const { shortId } = req.query; // If shortId is provided in the query string
    res.render('home', { shortId, urls });
});

router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup page
});

router.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

module.exports = router; // Export the router