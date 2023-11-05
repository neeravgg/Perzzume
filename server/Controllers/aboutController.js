const About = require('../Models/aboutModels');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAboutDetail = async (req, res) => {
	try {
		const cars = await About.find();
		res.send(cars);
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
			profile_image: req.file.path,
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
		const car = await About.findOne({ _id: req.body._id });
		car.name = req.body.name;
		car.image = req.body.image;
		car.fuelType = req.body.fuelType;
		car.rentPerHour = req.body.rentPerHour;
		car.capacity = req.body.capacity;

		await car.save();

		res.send('Car details updated successfully');
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { getAboutDetail, addAboutDetail, updateAboutDetail };
