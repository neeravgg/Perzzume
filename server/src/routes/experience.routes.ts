import express from "express";
const router = express.Router();

import {
	getExperienceList,
	addExperience,
	updateExperience,
	deleteExperience
} from '../controllers/experience.controller';

import { authenticateUser } from '../middlewares/authentication.middleware';
import { deleteImage, uploadImage, uploadMulter } from "../middlewares/image.upload.middleware";
import wrapper from "../middlewares/wrapper.middleware";

router.post('/get_list', getExperienceList);
router.post(
	'/add',
	authenticateUser,
	uploadMulter.single('image'),
	wrapper(uploadImage, { height: 520, width: 520 }),
	addExperience
);
router.put(
	'/update',
	authenticateUser,
	uploadMulter.single('image'),
	wrapper(uploadImage, { height: 520, width: 520 }, true),
	updateExperience
);
router.delete(
	'/delete/:id',
	authenticateUser,
	deleteImage,
	deleteExperience
);


export default router;
