const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const responseHandler = require('../responseHandler/sendResponse'); // Import your response handling module

function catchHelper(res, e) {
	if (e instanceof CustomError.UnauthenticatedError) {
		responseHandler.sendResponse(res, e.statusCode, e.message, null);
	} else if (e instanceof CustomError.BadRequestError) {
		responseHandler.sendResponse(res, e.statusCode, e.message, null);
	} else if (e instanceof CustomError.NotFoundError) {
		responseHandler.sendResponse(res, e.statusCode, e.message, null);
	} else {
		console.error(e);
		responseHandler.sendResponse(
			res,
			StatusCodes.INTERNAL_SERVER_ERROR,
			'Internal Server Error',
			null
		);
	}
}

module.exports = catchHelper;
