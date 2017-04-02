const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	account: String,
	password: String,
});

let userModel = mongoose.model('user', userSchema);

module.exports = userModel