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
import { dataByUserWrapper, uploadWrapper } from "../middlewares/wrapper.middleware";
import { dataByUser } from "../middlewares/dataByUser.middleware";

router.post('/get_list', uploadMulter.none(), getExperienceList);
router.post(
	'/add',
	authenticateUser,
	uploadMulter.single('image'),
	uploadWrapper(uploadImage, { height: 520, width: 520 }),
	addExperience
);
router.put(
	'/update',
	authenticateUser,
	uploadMulter.single('image'),
	dataByUserWrapper(dataByUser, 'experience'),
	uploadWrapper(uploadImage, { height: 520, width: 520 }, true),
	updateExperience
);
router.delete(
	'/delete/:id',
	authenticateUser,
	dataByUserWrapper(dataByUser, 'experience'),
	deleteImage,
	deleteExperience
);


export default router;
