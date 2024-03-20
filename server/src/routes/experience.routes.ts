import express from "express";
const router = express.Router();

import {
	getExperienceList,
	addExperience,
	updateExperience,
	deleteExperience
} from '../controllers/experience.controller';

import { authenticateUser } from '../middlewares/authentication.middleware';

router.post('/get_list/:user_id', getExperienceList);
router.post(
	'/add',
	authenticateUser,
	addExperience
);
router.put(
	'/update',
	authenticateUser,
	updateExperience
);
router.delete(
	'/delete/:id',
	authenticateUser,
	deleteExperience
);


export default router;
