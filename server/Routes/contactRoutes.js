const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/contactController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/sendContact', contactController.saveContactForm);
router.post('/getContact', authenticateUser, contactController.getContactList);

module.exports = router;
