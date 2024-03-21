import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Project } from '@prisma/client';
import { prisma } from '../../server';

const addProject: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { title, code_link, demo_link, description, image_name, image_url }: Project = req.body;

        const existingProjectCount = await prisma.project.count({
            where: {
                user_id: user.id,
            },
        })

        if (existingProjectCount >= 40) {
            throw new ErrorHelper('Project limited to 40.')
        }
        const createData = {
            title,
            code_link,
            demo_link,
            description,
            image_name,
            image_url,
            user_id: user.id,
        }
        await prisma.project.create({
            data: createData,
        });
        await prisma.user.update({
            where: { id: user.id },
            data: {
                project_count: { increment: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Project added', true, {});

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const getProjectList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user_id } = req.params;
        const _id = parseInt(user_id)
        const { page = 1, pageSize = 10 } = req.body

        const data = await prisma.project.findMany({
            skip: page - 1 * pageSize,
            take: pageSize,
            where: { user_id: _id }
        });

        if (!data || data.length === 0) {
            throw new ErrorHelper('No Project found.');
        }

        sendResponse(res, StatusCodes.OK, 'Project List.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

const updateProject: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { title, code_link, demo_link, description, id }: Project = req.body;

        const data = await prisma.project.update({
            where: { user_id: user.id, id: id },
            data: {
                title: title,
                code_link: code_link,
                demo_link: demo_link,
                description: description
            }
        })

        sendResponse(res, StatusCodes.OK, 'Project updated.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};
const deleteProject: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { id } = req.params
        const project_id = parseInt(id)

        const data = await prisma.project.delete({
            where: { user_id: user.id, id: project_id },
        });
        if (!data) {
            throw new ErrorHelper('The project can not be deleted!');
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                project_count: { decrement: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Project removed.', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

export { getProjectList, addProject, updateProject, deleteProject };
