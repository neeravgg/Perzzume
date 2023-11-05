const express = require('express');
const router = express.Router();
const {
	isAuthenticated,
	authenticateUser,
} = require('../middleware/authentication');
const imageUploadMiddleware = require('../middleware/image-upload');
const aboutController = require('../Controllers/aboutController');

router.get('/getAboutDetail', aboutController.getAboutDetail);
router.post(
	'/addAboutDetail',
	authenticateUser,
	// isAuthenticated,
	imageUploadMiddleware,
	aboutController.addAboutDetail
);
router.put('/updateAboutDetail', aboutController.updateAboutDetail);

module.exports = router;
