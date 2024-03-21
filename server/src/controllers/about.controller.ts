import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { controller_interface } from '../types/controller.interface';
import { prisma } from "../../server"
import { About } from '@prisma/client';
import { modal_interface } from '../types/modal.interface';

const getAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user_id } = req.params
        const _id = parseInt(user_id)
        const data = await prisma.about.findUnique({
            where: { user_id: _id },
        });
        sendResponse(res, StatusCodes.OK, 'Success!', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};


const addAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { description, title, name, image_name, image_url }: About = req.body;
        const aboutExist = await prisma.about.findUnique({
            where: { user_id: user.id },
        });
        if (aboutExist) {
            throw new ErrorHelper('About already exists');
        }
        const createData = {
            name,
            description,
            title,
            image_name,
            image_url,
            user_id: user.id,
        }
        await prisma.about.create({
            data: createData,
        });
        sendResponse(res, StatusCodes.OK, 'Success!', true, createData);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const updateAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { description, title, name }: About = req.body;
        const aboutExist = await prisma.about.findUnique({
            where: { user_id: user.id },
        });
        if (!aboutExist) {
            throw new ErrorHelper('About does not exist');
        }

        await prisma.about.update({
            where: { user_id: user.id },
            data: {
                description: description,
                title: title,
                name: name,
            },
        });

        sendResponse(res, StatusCodes.OK, 'Success!', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};



export { getAboutDetail, addAboutDetail, updateAboutDetail };
