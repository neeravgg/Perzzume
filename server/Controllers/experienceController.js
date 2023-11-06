const { default: mongoose } = require('mongoose');
const Experience = require('../Models/experienceModels');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');

const addExperience = async (req, res) => {
	try {
		const count = await Experience.countDocuments();
		const maxCount = 7;

		if (count < maxCount) {
			const newExperience = new Experience(req.body);
			await newExperience.save();
			responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', []);
		} else {
			responseHandler.sendResponse(
				res,
				StatusCodes.OK,
				'Experience limit exceeded',
				[]
			);
		}
	} catch (error) {
		catchHelper(res, error);
	}
};

const getExperienceList = async (req, res) => {
	try {
		const { user } = req.body;
		const pipeline = [
			{
				$match: { user: mongoose.Types.ObjectId(user) },
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
			{
				$limit: 6,
			},
		];

		const data = await Experience.aggregate(pipeline);

		if (!data || data.length === 0) {
			return responseHandler.sendResponse(
				res,
				StatusCodes.OK,
				'No matching Experince found for the user!',
				[]
			);
		}

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', data);
	} catch (error) {
		catchHelper(res, error);
	}
};

const updateExperience = async (req, res) => {
	try {
		const { comapny, job_title, description, user, id } = req.body;
		const experienceExist = await Experience.exists({ user: user, _id: id });
		if (!experienceExist) {
			throw new CustomError.BadRequestError('Experience does not exist');
		}
		await Experience.findOneAndUpdate(
			{ user: user, _id: id },
			{
				$set: {
					description: description,
					job_title: job_title,
					comapny: comapny,
				},
			}
		);
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', []);
	} catch (error) {
		catchHelper(res, error);
	}
};

const deleteExperience = async (req, res) => {
	try {
		const { user, id } = req.body;

		await Experience.findOneAndDelete({ user: user, _id: id });

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', []);
	} catch (error) {
		catchHelper(res, error);
	}
};

module.exports = {
	getExperienceList,
	addExperience,
	updateExperience,
	deleteExperience,
};
