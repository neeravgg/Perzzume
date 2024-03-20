import { User } from "@prisma/client";
import { modal_interface } from "../types/modal.interface";
import { StatusCodes } from "http-status-codes";
import { ErrorHelper } from "./error.helper";
import { prisma } from "../../server";

const jwt = require('jsonwebtoken')


const isTokenValid = async (token: string): Promise<modal_interface['user'] | false> => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (err) {
        return false;
    }
};

const generateAccessToken = (user_id: number) => {
    return jwt.sign({ id: user_id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5s",
    });
};

const generateRefreshToken = (user_id: number) => {
    return jwt.sign({ id: user_id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};

const tokenDbCheck = async (token: string) => {
    const decoded = await isTokenValid(token);
    if (decoded === false) {
        throw new ErrorHelper('Invalid Token', StatusCodes.UNAUTHORIZED);
    }
    const existingToken = await prisma.token.findUnique({ where: { user_id: decoded.id, valid_status: true } })
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
