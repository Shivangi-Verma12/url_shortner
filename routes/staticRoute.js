const express = require('express'); 
const URL = require('../models/url'); // Import the URL model

const router = express.Router(); // Create a new router

router.get('/home', async (req, res) => {
    // If shortId is present in the query string, pass it to the template
    const urls = await URL.find(); // Fetch all URLs for display
    const { shortId } = req.query; // If shortId is provided in the query string
    // Render the home page with the shortId and list of URLs
    res.render('home', { shortId, urls });
})

router.get('/signup', (req, res) => {  
    res.render('signup'); // Render the signup page
})

router.get('/login', (req, res) => {  
    res.render('login'); // Render the login page
})

module.exports = router; // Export the router   