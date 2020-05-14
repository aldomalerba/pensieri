var express = require('express');
const { 
    getAllPensieri,
    addPensiero,
    getPensieriBySessionUser
} = require('../../controller/PensieriController');

const router = express.Router();

router.get('/', getAllPensieri);
router.post('/', addPensiero); 
router.get('/user', getPensieriBySessionUser);

module.exports = router;