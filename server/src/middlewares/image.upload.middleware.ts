import multer from 'multer'
import sharp from 'sharp'
import { middlewareInterface } from '../types/middleware.interface';
import { generateFileName } from '../helpers/upload.helper';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../services/awsS3'
import { ErrorHelper } from '../helpers/error.helper';
import { sendError } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';

//  multer
const storage = multer.memoryStorage()
const uploadMulter = multer({ storage: storage });

// add image
const uploadImage: middlewareInterface['uploadImage'] = async (resizeOptions = { height: 520, width: 520 }, req, res, next, update) => {
    if (update && !req.body.image_name) {
        return next()
    }
    const file = req.file

    if (file) {
        const imageName: string = req.body.image_name || generateFileName()

        const fileBuffer = await sharp(file.buffer)
            .resize(resizeOptions)
            .toBuffer()

        await uploadFile(fileBuffer, imageName, file.mimetype)

        if (!req.body.image_name) {
            const image_url = await getObjectSignedUrl(imageName)
            res.locals.image_name = imageName
            res.locals.image_url = image_url
        }
    }
    return next()

}

const deleteImage: middlewareInterface['deleteImage'] = async (req, res, next) => {
    try {
        const modalDataByUser = res.locals.modal_data

        const imageName: string = req.body.image_name || modalDataByUser.image_name
        if (!imageName) {
            throw new ErrorHelper('Try again!')
        }

        await deleteFile(imageName)

        return next()
    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);
    }
}

export { uploadMulter, uploadImage, deleteImage }
