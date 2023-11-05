const multer = require('multer');
const Image = require('../Models/imageModels'); // Import your Image model here

// Create a function that returns the middleware
function imageUploadMiddleware(req, res, next) {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			return cb(null, 'uploads/'); // Specify the destination directory for uploaded files
		},
		filename: function (req, file, cb) {
			return cb(null, Date.now() + '-' + file.originalname);
		},
	});

	const upload = multer({ storage: storage });

	upload.single('image')(req, res, async (err) => {
		if (err) {
			return res.status(400).json({ error: err.message });
		}

		try {
			if (!req.file) {
				throw new Error('No file uploaded');
			}

			const { filename, path } = req.file;
			const image = new Image({ filename, path });
			await image.save();

			req.uploadedImageId = image._id; // Attach the image ID to the request object

			next();
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	});
}

module.exports = imageUploadMiddleware;
