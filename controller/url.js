const {shortid} = require('shortid'); 
const URL = require('../models/url'); 

//using nano id npm package to generate shorter URL , need to pass length and utna length ek string gen ho jae ga
async function generateNewShortURL(req,res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }
    const shortId = shortid(8); // Generate a 8-character unique ID
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.status(201).json({ shortId: shortId });
}

module.exports = {
    generateNewShortURL,
}