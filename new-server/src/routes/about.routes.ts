import { router } from '../server'

const {
	isAuthenticated,
	authenticateUser,
} = require('../middleware/authentication');
const imageUploadMiddleware = require('../middleware/image-upload');
const aboutController = require('../Controllers/aboutController');

router.post('/getAboutDetail', aboutController.getAboutDetail);
router.post(
	'/addAboutDetail',
	authenticateUser,
	// imageUploadMiddleware,
	aboutController.addAboutDetail
);
router.put(
	'/updateAboutDetail',
	authenticateUser,
	aboutController.updateAboutDetail
);

export default router;
