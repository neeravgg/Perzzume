const Project = require('../Models/projectModels');

const getProjectList = async (req, res) => {
	try {
		const cars = await Project.find();
		res.send(cars);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const addProject = async (req, res) => {
	try {
		const newcar = new Project(req.body);
		await newcar.save();
		res.send('Car added successfully');
	} catch (error) {
		return res.status(400).json(error);
	}
};

const updateProject = async (req, res) => {
	try {
		const car = await Project.findOne({ _id: req.body._id });
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

module.exports = { getProjectList, addProject, updateProject };
