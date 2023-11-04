const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');

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
		throw new CustomError.UnauthenticatedError('Authentication Invalid');
	}
};

const isAuthenticated = (req, res, next) => {
	let checker = req.user.userId === req?.profile?._id.toString();
	if (!checker) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			error: 'ACCESS DENIED',
		});
	}
	next();
};

module.exports = { authenticateUser, isAuthenticated };
