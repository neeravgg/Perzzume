import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { controller_interface } from '../types/controller.interface';
import { Contact } from '@prisma/client';
import { prisma } from '../../server';
import { localsInterface } from '../types/locals.interface';
import { modal_interface } from '../types/modal.interface';
import {
    addValidate,
    getListValidate,
    deleteValidate
} from '../validators/contact.validation'

const addContact: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = addValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const { email, message, name, user_id }: modal_interface['contact'] = req.body;
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
            user_id: parseInt(user_id),
        }
        await prisma.contact.create({
            data: createData,
        });
        await prisma.user.update({
            where: { id: parseInt(user_id) },
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
        const { error } = deleteValidate.validate(req.params);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { id } = req.params

        const data = await prisma.contact.delete({
            where: { id: parseInt(id) },
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
        const { error } = getListValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }
        const user: localsInterface['decoded_user'] = res.locals.user
        const { page = '1', pageSize = '10' } = req.body
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
