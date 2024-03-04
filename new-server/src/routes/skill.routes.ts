import { router } from '../../server'

import {
    getSkillList,
    addSkill,
    updateSkill,
    deleteSkill
} from '../controllers/skill.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';


router.post('/getSkillList', getSkillList);
router.post('/addSkill', authenticateUser, addSkill);
router.put('/updateSkill', authenticateUser, updateSkill);
router.put('/deleteSkill', authenticateUser, deleteSkill);


export default router;
