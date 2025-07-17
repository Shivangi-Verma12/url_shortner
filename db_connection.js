const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    try {
        // Connect to MongoDB with the provided URL
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

// Export the connection function
module.exports = {
    connectToMongoDB,
}
