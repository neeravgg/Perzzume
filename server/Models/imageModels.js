const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
	{
		filename: { type: String, required: true },
		path: { type: String, required: true },
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);
const imageModel = mongoose.model('image', imageSchema);
module.exports = imageModel;
