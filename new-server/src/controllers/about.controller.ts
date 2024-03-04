import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { controller_interface } from '../types/controller.interface';
import { prisma } from "../../server"

const getAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = req.body;
        const data = await prisma.about.findOne({
            where: { user: user },
        });
        sendResponse(res, StatusCodes.OK, 'Success!', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const addAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { description, title, user } = req.body;
        const aboutExist = await prisma.about.findUnique({
            where: { user: user },
        });
        if (aboutExist) {
            throw new ErrorHelper('About already exists');
        }

        await prisma.about.create({
            data: {
                description,
                title,
                user: user,
            },
        });
        sendResponse(res, StatusCodes.OK, 'Success!', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const updateAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { description, title, user } = req.body;
        const aboutExist = await prisma.about.findUnique({
            where: { user: user },
        });
        if (!aboutExist) {
            throw new ErrorHelper('About does not exist');
        }

        await prisma.about.update({
            where: { user: user },
            data: {
                description: description,
                title: title,
            },
        });

        sendResponse(res, StatusCodes.OK, 'Success!', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

export { getAboutDetail, addAboutDetail, updateAboutDetail };
