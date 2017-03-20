const mongoose = require('mongoose');

let picsSchema = new mongoose.Schema({
    url: String,
});

let picsModel = mongoose.model('pics', picsSchema);

module.exports = picsModel