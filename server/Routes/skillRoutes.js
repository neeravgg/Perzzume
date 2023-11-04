const express = require("express");
const router = express.Router();
const skillController = require("../Controllers/skillController");

router.get("/getSkillList", skillController.getSkillList);
router.post("/addSkill", skillController.addSkill);
router.put("/updateSkill", skillController.updateSkill);

module.exports = router;
