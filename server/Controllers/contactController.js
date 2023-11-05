const ContactModel = require('../Models/contactModels');
const catchHelper = require('../responseHandler/catchHelper');
const responseHandler = require('../responseHandler/sendResponse');
const { StatusCodes } = require('http-status-codes');

const saveContactForm = async (req, res) => {
	try {
		const newContact = new ContactModel(req.body);
		await newContact.save();
		responseHandler.sendResponse(
			res,
			StatusCodes.OK,
			'Note send successfully',
			{}
		);
	} catch (error) {
		catchHelper(res, error);
	}
};

module.exports = { saveContactForm };
