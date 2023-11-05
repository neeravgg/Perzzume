const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		password: { type: String, required: true },
		email: { type: String, required: true },
		about: {
			type: mongoose.Types.ObjectId,
			ref: 'About',
		},
		// contacts: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: 'Contact',
		// },
		// experiences: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: 'Experience',
		// },
		// projects: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: 'Project',
		// },
		// skills: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: 'Skill',
		// },
	},
	{ timestamps: true }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
