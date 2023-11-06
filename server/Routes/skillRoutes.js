const express = require('express');
const router = express.Router();
const skillController = require('../Controllers/skillController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/getSkillList', skillController.getSkillList);
router.post('/addSkill', authenticateUser, skillController.addSkill);
router.put('/updateSkill', authenticateUser, skillController.updateSkill);
router.put('/deleteSkill', authenticateUser, skillController.deleteSkill);

module.exports = router;
