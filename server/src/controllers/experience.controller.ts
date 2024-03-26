import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Experience } from '@prisma/client';
import { prisma } from '../../server';
import { middlewareInterface } from '../types/middleware.interface';

const addExperience: controller_interface['basicController'] = async (req, res) => {
    try {
        const user: middlewareInterface['decoded_user'] = res.locals.user
        const { image_name, image_url } = res.locals
        const { company, job_title, description }: Experience = req.body;

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
        sendResponse(res, StatusCodes.OK, 'Experience added', true, {});

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const getExperienceList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user_id } = req.params;
        const _id = parseInt(user_id)
        const { page = 1, pageSize = 10 } = req.body

        const data = await prisma.experience.findMany({
            skip: page - 1 * pageSize,
            take: pageSize,
            where: { user_id: _id }
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
        const user: middlewareInterface['decoded_user'] = res.locals.user
        const { company, job_title, description, id }: Experience = req.body;

        const data = await prisma.experience.update({
            where: { user_id: user.id, id: id },
            data: {
                company: company,
                job_title: job_title,
                description: description,
            }
        })

        sendResponse(res, StatusCodes.OK, 'Experience updated.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

const deleteExperience: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { id } = req.params
        const experience_id = parseInt(id)

        const data = await prisma.experience.delete({
            where: { user_id: user.id, id: experience_id },
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
