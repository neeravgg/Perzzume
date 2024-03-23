import { User } from "@prisma/client";
import { modal_interface } from "../types/modal.interface";
import { StatusCodes } from "http-status-codes";
import { ErrorHelper } from "./error.helper";
import { prisma } from "../../server";
import jwt, { JwtPayload } from 'jsonwebtoken'


type EnvironmentVariables = {
    JWT_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
};

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET }: EnvironmentVariables = process.env as EnvironmentVariables;

const isTokenValid = async (token: string, type: string): Promise<JwtPayload | string | false> => {

    if (type === 'access_jwt') {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }
    else if (type === 'refresh_jwt') {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    }
    return false

};

const generateAccessToken = (user_id: number) => {
    return jwt.sign({ id: user_id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "5s",
    });
};

const generateRefreshToken = (user_id: number) => {
    return jwt.sign({ id: user_id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};

const tokenDbCheck = async (token: string, type: string) => {
    const decoded = await isTokenValid(token, type);

    if (decoded === false || typeof decoded === 'string' || !decoded.id) {
        throw new ErrorHelper('Invalid Token', StatusCodes.UNAUTHORIZED);
    }
    const id: number = decoded.id as number
    const existingToken = await prisma.token.findUnique({
        where: {

            user_id: id,
        }
    });
    if (!existingToken) {
        throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
    }

    return { decoded, existingToken }

}

export {
    isTokenValid,
    generateAccessToken,
    generateRefreshToken,
    tokenDbCheck
};
