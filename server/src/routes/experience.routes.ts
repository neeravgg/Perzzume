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

router.post('/get_list/:user_id', getExperienceList);
router.post(
	'/add',
	authenticateUser,
	uploadMulter.single('image'),
	uploadImage,
	addExperience
);
router.put(
	'/update',
	authenticateUser,
	uploadMulter.single('image'),
	uploadImage,
	updateExperience
);
router.delete(
	'/delete/:id',
	authenticateUser,
	deleteImage,
	deleteExperience
);


export default router;
