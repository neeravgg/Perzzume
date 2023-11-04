const { v4: uuidv4 } = require('uuid');
const { createTokenPayload, createJWT } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const responseHandler = require('../responseHandler/sendResponse');
const CustomError = require('../errors');
const User = require('../Models/userModals');
const Token = require('../Models/TokenModel');
const catchHelper = require('../responseHandler/catchHelper');

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email) {
			throw new CustomError.BadRequestError('Please provide an email.');
		} else if (!password) {
			throw new CustomError.BadRequestError('Please enter the password');
		}

		const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

		if (!user) {
			throw new CustomError.UnauthenticatedError('Invalid Credentials');
		}

		const isPasswordCorrect = user.password == password;
		// const isPasswordCorrect = true;

		if (!isPasswordCorrect) {
			throw new CustomError.UnauthenticatedError('Invalid Credentials');
		}

		const tokenUser = createTokenPayload(user);

		// check for existing token
		const existingToken = await Token.findOne({ user: user._id });

		if (existingToken) {
			await Token.findOneAndDelete({ user: user._id });
		}

		const token = createJWT({ payload: tokenUser });
		const userAgent = req.headers['user-agent'];
		const ip = req.ip;
		const userToken = { token, ip, userAgent, user: user._id };

		await Token.create(userToken);

		//res.status(StatusCodes.OK).json({ accessToken: token });
		responseHandler.sendResponse(res, StatusCodes.OK, 'successfully loggedIn', {
			accessToken: token,
		});
	} catch (e) {
		catchHelper(res, e);
	}
};

module.exports = { adminLogin };
