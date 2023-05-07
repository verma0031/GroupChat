const express = require('express');
const router = express.Router();

const groupController = require('../controller/group');
const authorization = require('../middleware/authorization');

router.post('/create-group', authorization.authenticate, groupController.createGroup);

module.exports = router;