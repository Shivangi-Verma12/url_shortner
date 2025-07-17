// Import required modules
const express = require('express'); // Express framework for server
const connectToMongoDB = require('./db_connection'); // MongoDB connection logic
const urlRoutes = require('./routes/url'); // URL-related routes
const URL = require('./models/url'); // Mongoose model for URL documents

const app = express(); // Create Express app
const port = 8001; // Port number for server

// Connect to MongoDB database
connectToMongoDB('mongodb://127.0.0.1:27017/short-url');

// Middleware to parse JSON and URL-encoded bodies from requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Mount URL routes at /url (e.g., /url/analytics/:shortId)
app.use('/url', urlRoutes);

// Route to handle redirection using shortId (e.g., /abc123)
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId; // Get shortId from URL
    // Find the URL document by shortId and update visit history
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
        // If not found, send 404
        return res.status(404).send('URL not found');
    }
    // Redirect to the original URL
    res.redirect(entry.redirectURL);
});

// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve the home page (GET /). Pass shortId from query string if present.
app.get('/', (req, res) => {
    // If shortId is present in the query string, pass it to the template
    const { shortId } = req.query;
    res.render('home', { shortId });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`server listing on port: ${port}`);
});