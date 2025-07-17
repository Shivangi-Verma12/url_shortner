// Import shortid for generating unique short URLs
const shortid = require('shortid');
const URL = require('../models/url');

// Controller to generate a new short URL
// Expects { url: 'original_url' } in the request body
async function generateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        // If no URL is provided, return 400 error
        return res.status(400).json({ error: "URL is required" });
    }
    // Generate a unique shortId using shortid
    const shortId = shortid.generate(8); // Generate an 8-character unique ID
    // Create a new URL document in the database
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    // Respond with the generated shortId
    return res.status(201).json({ shortId: shortId });
}

// Controller to get analytics for a short URL
// Returns total clicks and visit history
async function handelGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    // Find the URL document by shortId
    const result = await URL.findOne({ shortId: shortId });
    if (!result) {
        // If not found, return 404 error
        return res.status(404).json({ error: "URL not found" });
    }
    // Respond with analytics data
    return res.json({
        totalClicks: result.visitHistory.length,
        Analytics: result.visitHistory
    });
}

// Export the controller functions
module.exports = {
    generateNewShortURL,
    handelGetAnalytics
}