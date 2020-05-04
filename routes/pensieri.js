var express = require('express');
const { getAllPensieri , addPensiero } = require('../controller/PensieriController');
const router = express.Router();


router.get('/', getAllPensieri);
router.post('/', addPensiero); 

module.exports = router;