const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		// profile_image: { type: String },
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const aboutModel = mongoose.model('about', aboutSchema);

module.exports = aboutModel;
