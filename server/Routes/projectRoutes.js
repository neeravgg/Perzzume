const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/projectController");

router.get("/getProjectList", projectController.getProjectList);
router.post("/addProject", projectController.addProject);
router.put("/updateProject", projectController.updateProject);

module.exports = router;
