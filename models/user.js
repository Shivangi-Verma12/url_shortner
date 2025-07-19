// Import mongoose for schema definition
const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

