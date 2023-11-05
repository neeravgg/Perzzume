const express = require("express");
const router = express.Router();
const experienceController = require("../Controllers/experienceController");

router.post("/getExperienceList", experienceController.getExperienceList);
router.post("/addExperience", experienceController.addExperience);
router.put("/updateExperience", experienceController.updateExperience);
router.put("/deleteExperience", experienceController.deleteExperience);

module.exports = router;
