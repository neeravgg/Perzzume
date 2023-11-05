const express = require("express");
const router = express.Router();
const skillController = require("../Controllers/skillController");

router.post("/getSkillList", skillController.getSkillList);
router.post("/addSkill", skillController.addSkill);
router.put("/updateSkill", skillController.updateSkill);
router.put('/deleteSkill', skillController.deleteSkill);

module.exports = router;
