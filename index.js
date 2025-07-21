const express = require('express'); 
const cookieParser = require('cookie-parser'); // Import cookie-parser to handle cookies
const {connectToMongoDB} = require('./db_connection');
const URL = require('./models/url'); 

const { restrictToLoggedinUserOnly } = require('./middlewares/auth'); // Import authentication middleware

const urlRoutes = require('./routes/url'); 
const userRoute = require('./routes/user');
const staticRoute = require('./routes/staticRoute');

const app = express(); 
const port = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url'); // Connect to MongoDB database

// Middleware to parse JSON and URL-encoded bodies from requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Use cookie-parser middleware to handle cookies

app.use('/user', userRoute);
app.use('/url',restrictToLoggedinUserOnly ,urlRoutes); //this will restrict access to URL routes to logged-in users
app.use('/', staticRoute);


// Route to handle redirection using shortId 
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId; // Get shortId from URL
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
        return res.status(404).send('URL not found'); // If not found, send 404
    }
    res.redirect(entry.redirectURL); // Redirect to the original URL
});

// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the directory for EJS templates


app.listen(port, () => {console.log(`server listing on port: ${port}`)});