const Skill = require('../Models/skillModals');
const { default: mongoose } = require('mongoose');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');

const getSkillList = async (req, res) => {
	try {
		const { user } = req.body;
		const pipeline = [
			{
				$match: { user: mongoose.Types.ObjectId(user) },
			},
			{
				$limit: 5,
			},
		];

		const data = await Skill.aggregate(pipeline);

		if (!data || data.length === 0) {
			return responseHandler.sendResponse(
				res,
				StatusCodes.NOT_FOUND,
				'No matching Skill found for the user!',
				{}
			);
		}

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', data);
	} catch (error) {
		catchHelper(res, error);
	}
};

const addSkill = async (req, res) => {
	try {
		const newSkill = new Skill(req.body);
		await newSkill.save();
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};

const updateSkill = async (req, res) => {
	try {
		const { title, shadow_color, user, id } = req.body;
		const SkillExist = await Skill.exists({ user: user, _id: id });
		if (!SkillExist) {
			throw new CustomError.BadRequestError('Skill does not exist');
		}
		await Skill.findOneAndUpdate(
			{ user: user, _id: id },
			{
				$set: {
					title: title,
					shadow_color: shadow_color,
				},
			}
		);
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};
const deleteSkill = async (req, res) => {
	try {
		const { user, id } = req.body;

		await Skill.findOneAndDelete({ user: user, _id: id });

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};

module.exports = { getSkillList, addSkill, updateSkill, deleteSkill };
