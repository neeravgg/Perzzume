const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		password: { type: String, required: true },
		email: { type: String, required: true },
	},
	{ timestamps: true }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
