const express = require('express');
const connectToMongoDB  = require('./db_connection');
const urlRoutes = require('./routes/url');
const URL = require('./models/url');     

const app = express();
const port = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use('/url', urlRoutes);

app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    // Logic to find the URL by shortId and redirect
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
        return res.status(404).send('URL not found');
    }
    res.redirect(entry.redirectURL);
});

app.listen(port, () => { console.log(`server listing on port: ${port}`);
})