const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		image: { type: String, required: true },
		code_link: { type: String, required: true },
		demo_link: { type: String },
	},
	{ timestamps: true }
);
const projectModel = mongoose.model('project', projectSchema);
module.exports = projectModel;
