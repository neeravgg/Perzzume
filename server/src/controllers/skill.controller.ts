import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Skill } from '@prisma/client';
import { prisma } from '../../server';
import { localsInterface } from '../types/locals.interface';
import { addValidate, deleteValidate, getListValidate, updateValidate } from '../validators/skill.validation'
import { modal_interface } from '../types/modal.interface';

const getSkillList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = getListValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { user_id, page = '1', pageSize = '10' } = req.body
        const skip = (page - 1) * pageSize
        const size = parseInt(pageSize)

        const data = await prisma.skill.findMany({
            skip: skip,
            take: size,
            where: { user_id: parseInt(user_id) }
        });

        if (!data || data.length === 0) {
            throw new ErrorHelper('No Skill found.');
        }

        sendResponse(res, StatusCodes.OK, 'Skill List.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};


const addSkill: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = addValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { image_name, image_url } = res.locals
        const { title }: modal_interface['skill'] = req.body;

        const existingSkillCount = await prisma.skill.count({
            where: {
                user_id: user.id,
            },
        })

        if (existingSkillCount >= 50) {
            throw new ErrorHelper('Skill limited to 50.')
        }
        const createData = {
            title,
            image_name,
            image_url,
            user_id: user.id,
        }
        const data = await prisma.skill.create({
            data: createData,
        });

        await prisma.user.update({
            where: { id: user.id },
            data: {
                skill_count: { increment: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Skill added', true, data);

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};


const updateSkill: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = updateValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { title, id }: modal_interface['skill'] = req.body;

        const data = await prisma.skill.update({
            where: {
                users_data: {
                    id: parseInt(id),
                    user_id: user.id
                }
            },
            data: {
                title: title,
            }
        })

        sendResponse(res, StatusCodes.OK, 'Skill updated.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

const deleteSkill: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = deleteValidate.validate(req.params);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const user: localsInterface['decoded_user'] = res.locals.user
        const { id } = req.params

        const data = await prisma.skill.delete({
            where: {
                users_data: {
                    id: parseInt(id),
                    user_id: user.id
                }
            },
        });

        if (!data) {
            throw new ErrorHelper('The skill can not be deleted!');
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                skill_count: { decrement: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Skill removed.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

export { getSkillList, addSkill, updateSkill, deleteSkill };
