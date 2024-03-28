import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { prisma } from '../../server';
import { localsInterface } from '../types/locals.interface';
import { addValidate, deleteValidate, getListValidate, updateValidate } from '../validators/project.validation'
import { modal_interface } from '../types/modal.interface';

const addProject: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = addValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { image_name, image_url } = res.locals
        const { title, code_link, demo_link, description }: modal_interface['project'] = req.body;

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
        const data = await prisma.project.create({
            data: createData,
        });
        await prisma.user.update({
            where: { id: user.id },
            data: {
                project_count: { increment: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Project added', true, data);

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const getProjectList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = getListValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const { user_id, page = '1', pageSize = '10' } = req.body
        const skip = (page - 1) * pageSize
        const size = parseInt(pageSize)

        const data = await prisma.project.findMany({
            skip: skip,
            take: size,
            where: { user_id: parseInt(user_id) }
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
        const { error } = updateValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const { user } = res.locals
        const { title, code_link, demo_link, description, id }: modal_interface['project'] = req.body;

        const data = await prisma.project.update({
            where: {
                users_data: {
                    id: parseInt(id),
                    user_id: user.id
                }
            },
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
        const { error } = deleteValidate.validate(req.params);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { id } = req.params

        const data = await prisma.project.delete({
            where: {
                users_data: {
                    user_id: user.id, id: parseInt(id)
                }
            },
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
        sendResponse(res, StatusCodes.OK, 'Project removed.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

export { getProjectList, addProject, updateProject, deleteProject };
