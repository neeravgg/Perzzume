const express = require("express");
const router = express.Router();
const aboutController = require("../Controllers/aboutController");

router.get("/getAboutDetail", aboutController.getAboutDetail);
router.post("/addAboutDetail", aboutController.addAboutDetail);
router.put("/updateAboutDetail", aboutController.updateAboutDetail);

module.exports = router;
