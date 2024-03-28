import { StatusCodes } from 'http-status-codes';
import { sendError, sendResponse } from '../handlers/response.handler';
import { middlewareInterface } from '../types/middleware.interface';
import { prisma } from '../../server';
import { localsInterface } from '../types/locals.interface';
import { ErrorHelper } from '../helpers/error.helper';


const dataByUser: middlewareInterface['dataByUser'] = async (modal, req, res, next) => {
    try {
        const user: localsInterface['decoded_user'] = res.locals.user
        const { id: paramId } = req.params
        const { id: bodyId } = req.body
        const id = paramId || bodyId
        let dynamicModel: any;

        switch (modal) {
            case 'about':
                dynamicModel = prisma.about;
                break;
            case 'experience':
                dynamicModel = prisma.experience;
                break;
            case 'skill':
                dynamicModel = prisma.skill;
                break;
            case 'project':
                dynamicModel = prisma.project;
                break;
            // Add cases for other tables as needed
            default:
                throw new ErrorHelper('Invalid table name');
        }

        const data = await dynamicModel.findUnique({
            where: {
                users_data: {
                    id: parseInt(id),
                    user_id: user.id
                }
            },
        });

        if (!data) {
            throw new ErrorHelper('Data does not exist!', StatusCodes.BAD_REQUEST)
        }
        res.locals.modal_data = data;
        return next();

    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);
    }
};

export { dataByUser }