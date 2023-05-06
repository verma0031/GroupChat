const express = require('express');
const router = express.Router();

const messageController = require('../controller/message');
const authorization = require('../middleware/authorization');

router.post('/sendMessage', authorization.authenticate, messageController.sendMessage);
router.get('/getOldMessages', authorization.authenticate, messageController.getOldMessages);
router.get('/getNewMessages', authorization.authenticate, messageController.getNewMessages);

module.exports = router;