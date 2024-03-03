import { router } from '../server'

const experienceController = require('../Controllers/experienceController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/getExperienceList', experienceController.getExperienceList);
router.post(
	'/addExperience',
	authenticateUser,
	experienceController.addExperience
);
router.put(
	'/updateExperience',
	authenticateUser,
	experienceController.updateExperience
);
router.put(
	'/deleteExperience',
	authenticateUser,
	experienceController.deleteExperience
);


export default router;
