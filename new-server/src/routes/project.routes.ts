import { router } from '../../server'

import {
    getProjectList,
    addProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller';
import { authenticateUser } from '../middlewares/authentication.middleware';


router.post('/getProjectList', getProjectList);
router.post('/addProject', authenticateUser, addProject);
router.put('/updateProject', authenticateUser, updateProject);
router.put('/deleteProject', authenticateUser, deleteProject);


export default router;
