import express from "express";
const router = express.Router();

import {
	isAuthenticated,
	authenticateUser,
} from '../middlewares/authentication.middleware';
import {
	getAboutDetail,
	addAboutDetail,
	updateAboutDetail
} from '../controllers/about.controller';

// GET 
router.get('/get_detail/:user_id', getAboutDetail);

// POST
router.post(
	'/add',
	authenticateUser,
	// imageUploadMiddleware,
	addAboutDetail
);
// PUT
router.put(
	'/update',
	authenticateUser,
	updateAboutDetail
);

export default router;
