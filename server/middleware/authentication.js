const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const Token = require('../Models/TokenModel');
const { StatusCodes } = require('http-status-codes');
const catchHelper = require('../responseHandler/catchHelper');

const authenticateUser = async (req, res, next) => {
	try {
		const accessToken = req.headers['authorization'];
		const bearerToken = accessToken.split(' ')[1];

		if (accessToken) {
			const payload = isTokenValid(bearerToken);
			if (!payload) {
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json({ msg: 'PL:Invalid Token' });
			}

			req.user = payload;
			return next();
		} else {
			return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Token' });
		}
	} catch (error) {
		catchHelper(res, error);
	}
};

const isAuthenticated = (req, res, next) => {
	console.log('code phata',req.user.userId, req?.body)

	let checker = req.user.userId == req?.body?.userId?.toString();
	if (!checker) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			error: 'ACCESS DENIED',
		});
	}
	next();
};

module.exports = { authenticateUser, isAuthenticated };
