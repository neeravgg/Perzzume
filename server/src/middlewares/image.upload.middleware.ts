import multer from 'multer'
import sharp from 'sharp'
import { middlewareInterface } from '../types/middleware.interface';
import { generateFileName } from '../helpers/upload.helper';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../services/awsS3'

//  multer
const storage = multer.memoryStorage()
const uploadMulter = multer({ storage: storage });

// add image
const uploadImage: middlewareInterface['uploadImage'] = async (resizeOptions, req, res, next) => {
    const file = req.file
    if (file) {
        const imageName: string = req.body.image_name || generateFileName()

        const fileBuffer = await sharp(file.buffer)
            .resize(resizeOptions)
            .toBuffer()

        await uploadFile(fileBuffer, imageName, file.mimetype)

        if (!req.body.image_name) {
            const image_url = getObjectSignedUrl(imageName)
            req.body.image_name = imageName
            req.body.image_url = image_url
        }
    }
    next()

}

const deleteImage: middlewareInterface['deleteImage'] = async (req, res, next) => {

    const imageName: string = req.body.image_name

    await deleteFile(imageName)

    next()

}

export { uploadMulter, uploadImage, deleteImage }
