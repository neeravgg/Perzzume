import multer from 'multer'
import sharp from 'sharp'
import { middlewareInterface } from '../types/middleware.interface';
import { generateFileName } from '../helpers/upload.helper';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../services/awsS3'
import { ErrorHelper } from '../helpers/error.helper';

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

    const imageName: string = req.body.image_name
    if (!imageName) {
        throw new ErrorHelper('Try again!')
    }
    await deleteFile(imageName)

    return next()

}

export { uploadMulter, uploadImage, deleteImage }
