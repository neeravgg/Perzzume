import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Experience } from '@prisma/client';
import { prisma } from '../../server';
import { localsInterface } from '../types/locals.interface';
import { modal_interface } from '../types/modal.interface';
import { addValidate, deleteValidate, getListValidate, updateValidate } from '../validators/experience.validation'

const addExperience: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = addValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { image_name, image_url } = res.locals
        const { company, job_title, description }: modal_interface['experience'] = req.body;

        const existingExperienceCount = await prisma.experience.count({
            where: {
                user_id: user.id,
            },
        })

        if (existingExperienceCount >= 30) {
            throw new ErrorHelper('Experience limited to 30.')
        }
        const createData = {
            company,
            job_title,
            description,
            image_name,
            image_url,
            user_id: user.id,
        }
        await prisma.experience.create({
            data: createData,
        });
        await prisma.user.update({
            where: { id: user.id },
            data: {
                experience_count: { increment: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Experience added', true, createData);

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const getExperienceList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = getListValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { user_id, page = '1', pageSize = '10' } = req.body
        const skip = (page - 1) * pageSize
        const size = parseInt(pageSize)

        const data = await prisma.experience.findMany({
            skip: skip,
            take: size,
            where: { user_id: parseInt(user_id) }
        });

        if (!data || data.length === 0) {
            throw new ErrorHelper('No Experience found.');
        }

        sendResponse(res, StatusCodes.OK, 'Experience List.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

const updateExperience: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = updateValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const { company, job_title, description, id }: modal_interface['experience'] = req.body;
        const updateData = {
            company: company,
            job_title: job_title,
            description: description,
        }
        const data = await prisma.experience.update({
            where: { id: parseInt(id) },
            data: updateData
        })

        sendResponse(res, StatusCodes.OK, 'Experience updated.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

const deleteExperience: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = deleteValidate.validate(req.params);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { id } = req.params

        const data = await prisma.experience.delete({
            where: { user_id: user.id, id: parseInt(id) },
        });
        if (!data) {
            throw new ErrorHelper('The experience can not be deleted!');
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                experience_count: { decrement: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Experience removed.', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

export {
    getExperienceList,
    addExperience,
    updateExperience,
    deleteExperience,
};
