import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Skill } from '@prisma/client';
import { prisma } from '../../server';

const getSkillList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user_id } = req.params;
        const _id = parseInt(user_id)
        const { page = 1, pageSize = 10 } = req.body

        const data = await prisma.skill.findMany({
            skip: page - 1 * pageSize,
            take: pageSize,
            where: { user_id: _id }
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
        const { user } = res.locals
        const { title }: Skill = req.body;

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
            user_id: user.id,
        }
        await prisma.skill.create({
            data: createData,
        });
        await prisma.user.update({
            where: { id: user.id },
            data: {
                skill_count: { increment: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Skill added', true, {});

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};


const updateSkill: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals
        const { title, id }: Skill = req.body;

        const data = await prisma.skill.update({
            where: { user_id: user.id, id: id },
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
        const { user } = res.locals
        const { id } = req.params
        const skill_id = parseInt(id)

        const data = await prisma.skill.delete({
            where: { user_id: user.id, id: skill_id },
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
        sendResponse(res, StatusCodes.OK, 'Skill removed.', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

export { getSkillList, addSkill, updateSkill, deleteSkill };
