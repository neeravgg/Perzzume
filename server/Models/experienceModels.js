const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
	{
		comapny: { type: String, required: true },
		job_title: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);
const experienceModel = mongoose.model('experience', experienceSchema);
module.exports = experienceModel;
