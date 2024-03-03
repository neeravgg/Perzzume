import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendError, sendResponse } from '../handlers/response.handler';
import { createJWT } from '../helpers/token.helper';
import { ErrorHelper } from "../helpers/error.helper"
import { prisma } from "../server"
import { loginValidate, registerValidate } from "../validators/auth.validation"



const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = loginValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { email, password } = req.body;

        const user = await prisma.User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!user) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }

        const isPasswordCorrect = user.password === password;

        if (!isPasswordCorrect) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }

        const existingToken = await prisma.Token.findOne({ user: user._id });

        if (existingToken) {
            await prisma.Token.findOneAndDelete({ user: user._id });
        }

        const token = createJWT({
            email: user.email,
            userId: user.id,
        });
        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const userToken = { token, ip, userAgent, user: user._id };

        await prisma.Token.create(userToken);
        const result = {
            accessToken: token,
            userId: user._id,
        }
        sendResponse(res, StatusCodes.OK, 'successfully loggedIn', true, result);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const adminRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = registerValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { email, password } = req.body;

        const emailAlreadyExists = await prisma.User.findOne({
            email: new RegExp(`^${email}$`, 'i'),
        });

        if (emailAlreadyExists) {
            throw new ErrorHelper('This email is already registered!', StatusCodes.UNAUTHORIZED);
        }

        let createObj = {
            email,
            password,
            // Add your userType logic here if needed
        };

        await prisma.User.create(createObj);

        sendResponse(res, StatusCodes.CREATED, 'successfully! registered', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

export { adminLogin, adminRegister };
