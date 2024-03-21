import express from "express";
const router = express.Router();

import {
	isAuthenticated,
	authenticateUser,
} from '../middlewares/authentication.middleware';
import {
	uploadImage,
	uploadMulter
} from '../middlewares/image.upload.middleware';

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
	uploadMulter.single('image'),
	uploadImage,
	addAboutDetail
);
// PUT
router.put(
	'/update',
	authenticateUser,
	uploadMulter.single('image'),
	uploadImage,
	updateAboutDetail
);

export default router;
