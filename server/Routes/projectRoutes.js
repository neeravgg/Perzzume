const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');

router.post('/getProjectList', projectController.getProjectList);
router.post('/addProject', projectController.addProject);
router.put('/updateProject', projectController.updateProject);
router.put('/deleteProject', projectController.deleteProject);

module.exports = router;
