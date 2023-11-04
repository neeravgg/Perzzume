const express = require("express");
const router = express.Router();
const aboutController = require("../Controllers/aboutController");

router.get("/getAboutDetail", aboutController.getAllcars);
router.post("/addAboutDetail", aboutController.addCar);
router.put("/updateAboutDetail", aboutController.editCar);

module.exports = router;
