const ContactModel = require('../Models/contactModels');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');

const saveContactForm = async (req, res) => {
	try {
		const newContact = new ContactModel(req.body);
		await newContact.save();
		responseHandler.sendResponse(
			res,
			StatusCodes.OK,
			'Message send successfully',
			[]
		);
	} catch (error) {
		catchHelper(res, error);
	}
};
const getContactList = async (req, res) => {
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

		const data = await ContactModel.aggregate(pipeline);

		if (!data || data.length === 0) {
			return responseHandler.sendResponse(
				res,
				StatusCodes.OK,
				'No matching Contact found for the user!',
				[]
			);
		}

		responseHandler.sendResponse(res, StatusCodes.OK, 'Success!', data);
	} catch (error) {
		catchHelper(res, error);
	}
};

module.exports = { saveContactForm, getContactList };
