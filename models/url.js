const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        require: true,
    },
    visitHistory: [{ timestamp: { type: Number } }] //it is array storing timestamp so that we can check when in got clicked
}, { timestamps: true }); //so that we know when entry was created

const url = mongoose.model("url", urlSchema);

module.exports = url;