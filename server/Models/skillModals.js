const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		icon_image: { type: String, required: true },
		shadow_color: { type: String, required: true },
	},
	{ timestamps: true }
);

const skillModel = mongoose.model('skill', skillSchema);

module.exports = skillModel;
