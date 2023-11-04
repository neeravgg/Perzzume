const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/contactController");


router.post("/sendContact", contactController.saveContactForm);

module.exports = router;
