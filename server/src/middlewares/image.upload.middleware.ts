// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const Image = require('../Models/imageModels');
// const crypto = require('crypto');
// const path = require('path');

// // Create a function that returns the middleware
// function imageUploadMiddleware(req, res, next) {
//     // Set up Multer for file storage
//     const storage = new GridFsStorage({
//         url: process.env.MONGO_URL,
//         file: (req, file) => {
//             return new Promise((resolve, reject) => {
//                 crypto.randomBytes(16, (err, buf) => {
//                     if (err) {
//                         return reject(err);
//                     }
//                     const filename = buf.toString('hex') + file.originalname;
//                     const fileInfo = {
//                         filename: filename,
//                         bucketName: 'uploads',
//                     };
//                     resolve(fileInfo);
//                 });
//             });
//         },
//     });

//     const upload = multer({ storage: storage });

//     upload.single('image')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ error: err.message });
//         }

//         try {
//             if (!req.file) {
//                 throw new Error('No file uploaded');
//             }

//             const { filename, path } = req.file;
//             const image = new Image({ filename, path });
//             await image.save();

//             req.uploadedImageId = image._id; // Attach the image ID to the request object

//             next();
//         } catch (error) {
//             return res.status(500).json({ error: error.message });
//         }
//     });
// }

// module.exports = imageUploadMiddleware;
