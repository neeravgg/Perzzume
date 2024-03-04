import { router } from '../../server'

import {
	getExperienceList,
	addExperience,
	updateExperience,
	deleteExperience
} from '../controllers/experience.controller';

import { authenticateUser } from '../middlewares/authentication.middleware';

router.post('/getExperienceList', getExperienceList);
router.post(
	'/addExperience',
	authenticateUser,
	addExperience
);
router.put(
	'/updateExperience',
	authenticateUser,
	updateExperience
);
router.put(
	'/deleteExperience',
	authenticateUser,
	deleteExperience
);


export default router;
