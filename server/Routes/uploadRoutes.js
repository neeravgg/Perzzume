const express = require('express');
const router = express.Router();
const pinataImageUpload = require('../middleware/pinata-image-upload-helper');
const { uploadToPinata } = require('../middleware/upload-pinata');

router.post('/upload-pinata', pinataImageUpload.single('image'), uploadToPinata);
module.exports = router;
