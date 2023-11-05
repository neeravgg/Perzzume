const About = require('../Models/aboutModels');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAboutDetail = async (req, res) => {
	try {
		const { userId } = req.body;
		const data = await About.findOne({ user: userId });
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', data);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const addAboutDetail = async (req, res) => {
	try {
		const { description, title, userId } = req.body;
		const aboutExist = await About.exists({ user: userId });
		if (aboutExist) {
			throw new CustomError.BadRequestError('About already exist');
		}
		const about = new About({
			description,
			title,
			// profile_image: req.file.path,
			user: userId,
		});
		await about.save();
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};

const updateAboutDetail = async (req, res) => {
	try {
		const { description, title ,userId} = req.body;
		const aboutExist = await About.exists({ user: userId });
		if (!aboutExist) {
			throw new CustomError.BadRequestError('About does not exist');
		}
		await About.findOneAndUpdate(
			{ user: userId },
			{
				$set: {
					description: description,
					title: title,
				},
			}
		);
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};

module.exports = { getAboutDetail, addAboutDetail, updateAboutDetail };
