const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/signup', userController.signup);

module.exports = router;