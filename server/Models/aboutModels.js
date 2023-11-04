const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		about: { type: String, required: true },
		profile_image: { type: String },
	},
	{ timestamps: true }
);

const aboutModel = mongoose.model('about', aboutSchema);

module.exports = aboutModel;
