const express = require('express');
const { authenticateUser } = require('../middleware/authentication');
const router = express.Router();

router.post(
	'/upload-pinata',
	authenticateUser
);
module.exports = router;
