const About = require('../Models/aboutModels');

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
		const newcar = new About(req.body);
		await newcar.save();
		res.send('Car added successfully');
	} catch (error) {
		return res.status(400).json(error);
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
