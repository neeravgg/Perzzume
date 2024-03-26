import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Contact } from '@prisma/client';
import { prisma } from '../../server';
import { middlewareInterface } from '../types/middleware.interface';


const addContact: controller_interface['basicController'] = async (req, res) => {
    try {
        const { email, message, name, user_id } = req.body;
        const userId = parseInt(user_id)
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Milliseconds in a day

        const existingContactCount = await prisma.contact.count({
            where: {
                email,
                created_at: {
                    gte: yesterday,
                    lt: now,
                },
            },
        })

        if (existingContactCount >= 2) {
            throw new ErrorHelper('Already contacted!', StatusCodes.NOT_ACCEPTABLE);
        }

        const createData = {
            email,
            message,
            name,
            user_id: userId,
        }
        await prisma.contact.create({
            data: createData,
        });
        await prisma.user.update({
            where: { id: userId },
            data: {
                contact_count: { increment: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Thank you for contacting', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const deleteContact: controller_interface['basicController'] = async (req, res) => {
    try {
        const user: middlewareInterface['decoded_user'] = res.locals.user
        const { id } = req.params
        const contact_id = parseInt(id)

        const data = await prisma.contact.delete({
            where: { id: contact_id },
        });
        if (!data) {
            throw new ErrorHelper('This can not be deleted!');
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                contact_count: { decrement: 1 }
            }
        })
        sendResponse(res, StatusCodes.OK, 'Contact deleted.', true, {});
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const getContactList: controller_interface['basicController'] = async (req, res) => {
    try {
        const { user } = res.locals;
        const { page = 1, pageSize = 10 } = req.body
        const skip = (page - 1) * pageSize
        const size = parseInt(pageSize)

        const data = await prisma.contact.findMany({
            skip: skip,
            take: size,
            where: { user_id: user.id }
        });

        if (!data || data.length === 0) {
            throw new ErrorHelper('No Contact found.', StatusCodes.NO_CONTENT);
        }

        sendResponse(res, StatusCodes.OK, 'Contact List.', true, data);
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

export { addContact, deleteContact, getContactList };
