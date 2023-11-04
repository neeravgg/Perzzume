const express = require("express");
const router = express.Router();
const experienceController = require("../Controllers/experienceController");

router.get("/getExperienceList", experienceController.getExperienceList);
router.post("/addExperience", experienceController.addExperience);
router.put("/updateExperience", experienceController.updateExperience);

module.exports = router;
