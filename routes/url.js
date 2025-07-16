const express=require('express');
const mongoose = require('mongoose'); 

const { generateNewShortURL, handelGetAnalytics } = require('../controller/url');  

const router = express.Router();

router.route('/')
    .post(generateNewShortURL)

router.get('/analytics/:shortId', handelGetAnalytics);

module.exports = router