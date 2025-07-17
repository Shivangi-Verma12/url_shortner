// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const { generateNewShortURL, handelGetAnalytics } = require('../controller/url');

const router = express.Router(); // Create a new router

// Route to create a new short URL
router.route('/')
    .post(generateNewShortURL)

// Route to get analytics for a specific short URL
router.get('/analytics/:shortId', handelGetAnalytics);

// Export the router
module.exports = router