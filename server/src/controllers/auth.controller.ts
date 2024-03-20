import { StatusCodes } from 'http-status-codes';
import { sendError, sendResponse } from '../handlers/response.handler';
import { generateAccessToken, generateRefreshToken, isTokenValid, tokenDbCheck } from '../helpers/token.helper';
import { ErrorHelper } from "../helpers/error.helper"
import { prisma } from "../../server"
import { loginValidate, registerValidate } from "../validators/auth.validation"
import { controller_interface } from '../types/controller.interface'
import { modal_interface } from '../types/modal.interface'
import brcrypt from 'bcrypt'
import { Token, User } from '@prisma/client';

const adminLogin: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = loginValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { email, password }: User = req.body;

        const user: User | null = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }
        const isPasswordCorrect = await brcrypt.compare(password, user.password);


        if (!isPasswordCorrect) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }
        const existingToken: Token | null = await prisma.token.findUnique({ where: { user_id: user.id } });

        if (existingToken) {
            await prisma.token.delete({
                where: { user_id: user.id }
            });
        }
        const accessToken = generateAccessToken(
            user.id
        );
        const refreshToken = generateRefreshToken(
            user.id
        );

        const userToken = { refresh_token: refreshToken, ip: req.ip ?? 'Unknown', user_agent: req.headers['user-agent'] ?? 'Unknown', valid_status: true, user_id: user.id };
        await prisma.token.create({ data: userToken });


        const result = {
            accessToken,
            user_id: user.id,
        }
        sendResponse(res, StatusCodes.OK, 'successfully loggedIn', true, result, { name: 'refesh_token', value: refreshToken });
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const adminRegister: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = registerValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { email, password }: User = req.body;

        const emailAlreadyExists: User | null = await prisma.user.findUnique({
            where: { email },
        });

        if (emailAlreadyExists) {
            throw new ErrorHelper('This email is already registered!', StatusCodes.UNAUTHORIZED);
        }

        let createObj = {
            email,
            password,
        };

        await prisma.user.create({ data: createObj });

        sendResponse(res, StatusCodes.CREATED, 'successfully! registered', true, { email });
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

const refreshToken: controller_interface['basicController'] = async (req, res) => {
    try {

        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }

        const { existingToken } = await tokenDbCheck(refreshToken)

        const newAccessToken = generateAccessToken(existingToken.id);
        const newRefreshToken = generateRefreshToken(existingToken.id);

        await prisma.token.update({
            where: { user_id: existingToken.id },
            data: {
                refresh_token: newRefreshToken
            },
        });

        sendResponse(res, StatusCodes.CREATED, 'Token refreshed', true, { accessToken: newAccessToken }, { name: 'refesh_token', value: newRefreshToken });
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }

}

export { adminLogin, adminRegister, refreshToken };
