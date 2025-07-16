const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = connectToMongoDB;
