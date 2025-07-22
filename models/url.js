// Import mongoose for schema definition
const mongoose = require('mongoose')

// Define the schema for shortened URLs
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String, // Unique short ID for the URL
        require: true,
        unique: true,
    },
    redirectURL: {
        type: String, // The original long URL
        require: true,
    },
    visitHistory: [
        { timestamp: { type: Number } } // Array of timestamps for each visit
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user who created the URL(urls me ek id denge jo user ko refer kare ga)
        ref: 'user', // Refers to the User model
        require: true,
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model from the schema
const url = mongoose.model("url", urlSchema);

// Export the model
module.exports = url;