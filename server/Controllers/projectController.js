const Project = require('../Models/projectModels');
const { default: mongoose } = require('mongoose');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');

const addProject = async (req, res) => {
	try {
		const newProject = new Project(req.body);
		await newProject.save();
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};

const getProjectList = async (req, res) => {
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

		const data = await Project.aggregate(pipeline);

		if (!data || data.length === 0) {
			return responseHandler.sendResponse(
				res,
				StatusCodes.NOT_FOUND,
				'No matching Project found for the user!',
				{}
			);
		}

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', data);
	} catch (error) {
		catchHelper(res, error);
	}
};

const updateProject = async (req, res) => {
	try {
		const { title, code_link, demo_link, user, id } = req.body;
		const ProjectExist = await Project.exists({ user: user, _id: id });
		if (!ProjectExist) {
			throw new CustomError.BadRequestError('Project does not exist');
		}
		await Project.findOneAndUpdate(
			{ user: user, _id: id },
			{
				$set: {
					title: title,
					code_link: code_link,
					demo_link: demo_link,
				},
			}
		);
		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};
const deleteProject = async (req, res) => {
	try {
		const { user, id } = req.body;

		await Project.findOneAndDelete({ user: user, _id: id });

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', {});
	} catch (error) {
		catchHelper(res, error);
	}
};

module.exports = { getProjectList, addProject, updateProject, deleteProject };
