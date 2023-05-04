const express = require('express');
const router = express.Router();

const messageController = require('../controller/message');
const authorization = require('../middleware/authorization');

router.post('/sendMessage', authorization.authenticate, messageController.sendMessage);
router.get('/getMessage', authorization.authenticate, messageController.getMessage);

module.exports = router;