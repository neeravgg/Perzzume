const Skill = require('../Models/skillModals');

const getSkillList = async (req, res) => {
	try {
		const cars = await Skill.find();
		res.send(cars);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const addSkill = async (req, res) => {
	try {
		const newcar = new Skill(req.body);
		await newcar.save();
		res.send('Car added successfully');
	} catch (error) {
		return res.status(400).json(error);
	}
};

const updateSkill = async (req, res) => {
	try {
		const car = await Skill.findOne({ _id: req.body._id });
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

module.exports = { getSkillList, addSkill, updateSkill };
