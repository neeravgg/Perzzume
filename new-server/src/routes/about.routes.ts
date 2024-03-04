import { router } from '../../server'

import {
	isAuthenticated,
	authenticateUser,
} from '../middlewares/authentication.middleware';
import {
	getAboutDetail,
	addAboutDetail,
	updateAboutDetail
} from '../controllers/about.controller';

router.post('/getAboutDetail', getAboutDetail);
router.post(
	'/addAboutDetail',
	authenticateUser,
	// imageUploadMiddleware,
	addAboutDetail
);
router.put(
	'/updateAboutDetail',
	authenticateUser,
	updateAboutDetail
);

export default router;
