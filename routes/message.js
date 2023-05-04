const express = require('express');
const router = express.Router();

const messageController = require('../controller/message');
const authorization = require('../middleware/authorization');

router.post('/sendMessage', authorization.authenticate, messageController.sendMessage);

module.exports = router;