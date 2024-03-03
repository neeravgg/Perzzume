import { router } from '../server'

const projectController = require('../Controllers/projectController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/getProjectList', projectController.getProjectList);
router.post('/addProject', authenticateUser, projectController.addProject);
router.put('/updateProject', authenticateUser, projectController.updateProject);
router.put('/deleteProject', authenticateUser, projectController.deleteProject);


export default router;
