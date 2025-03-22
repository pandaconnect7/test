const express = require('express');
const router = express.Router();

const { renterSend } = require('../controllers/renterController');
const { verifyToken } = require('../middlwares/verifyTokens');

router.post('/send', verifyToken, renterSend);

module.exports = router;
