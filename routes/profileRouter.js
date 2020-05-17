var express = require('express');
var router = express.Router();
var { getProfileByUsername, getProfile } = require('../controller/userController');

router.get('/:username', getProfileByUsername);

router.get('/', getProfile);

module.exports = router;
