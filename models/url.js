const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: string,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: string,
        require: true,
    },
    visitHistory: [{ timestamp: { type: Number } }] //it is array storing timestamp so that we can check when in got clicked
}, { timestamps: true });

const url = mongoose.model("url", urlSchema);

model.exports = url;