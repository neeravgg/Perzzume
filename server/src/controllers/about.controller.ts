import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { controller_interface } from '../types/controller.interface';
import { prisma } from "../../server"
import { About } from '@prisma/client';
import { modal_interface } from '../types/modal.interface';
import { localsInterface } from '../types/locals.interface';
import {
    addValidate,
    getListValidate,
    updateValidate
} from '../validators/about.validation'

const getAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = getListValidate.validate(req.params);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const { user_id } = req.params

        const data = await prisma.about.findUnique({
            where: { user_id: parseInt(user_id) },
        });
        sendResponse(res, StatusCodes.OK, 'Success!', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};


const addAboutDetail: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = addValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { image_name, image_url } = res.locals
        const { description, title, name }: About = req.body;

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
            image_name: image_name ?? null,
            image_url: image_url ?? null,
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
        const { error } = updateValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { description, title, name }: About = req.body;

        const aboutExist = await prisma.about.findUnique({
            where: { user_id: user.id },
        });
        if (!aboutExist) {
            throw new ErrorHelper('About does not exist');
        }
        const updateData = {
            description: description,
            title: title,
            name: name,
        }
        const data = await prisma.about.update({
            where: { user_id: user.id },
            data: updateData,
        });

        sendResponse(res, StatusCodes.OK, 'Success!', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};



export { getAboutDetail, addAboutDetail, updateAboutDetail };
