import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { AuthMiddlewareInterface } from '../types/middleware.interface';
import { isTokenValid, tokenDbCheck } from '../helpers/token.helper'
import { prisma } from '../../server';
import { User } from '@prisma/client';
import { modal_interface } from '../types/modal.interface';


const authenticateUser: AuthMiddlewareInterface['authenticate'] = async (req, res, next) => {
    try {
        const accessToken = req.headers['authorization'] as string | undefined;
        if (!accessToken) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }

        const bearerToken = accessToken.split(' ')[1];


        const { decoded, existingToken } = await tokenDbCheck(bearerToken)

        req.body.user = decoded;
        return next();

    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);
    }
};

const isAuthenticated: AuthMiddlewareInterface['authenticationCheck'] = (req, res, next) => {

    try {
        const checker = res.locals.user.id === (req?.body?.userId || null)?.toString();
        if (!checker) {
            throw new ErrorHelper('Unauthorized Access', StatusCodes.UNAUTHORIZED);

        }
        next();

    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);

    }
};


export { authenticateUser, isAuthenticated };
