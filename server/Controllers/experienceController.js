const Experience = require('../Models/experienceModels');

const getExperienceList = async (req, res) => {
	try {
		const cars = await Experience.find();
		res.send(cars);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const addExperience = async (req, res) => {
	try {
		const newcar = new Experience(req.body);
		await newcar.save();
		res.send('Car added successfully');
	} catch (error) {
		return res.status(400).json(error);
	}
};

const updateExperience = async (req, res) => {
	try {
		const car = await Experience.findOne({ _id: req.body._id });
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

module.exports = { getExperienceList, addExperience, updateExperience };
