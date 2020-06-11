var express = require('express');
const { 
    addLike,
    removeLike
} = require('../../controller/likeController');

const router = express.Router();

router.post('/', addLike);
router.delete('/:pensieroId', removeLike);

module.exports = router;