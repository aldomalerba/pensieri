var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  if(!req.user)
    res.render('login',{ title: 'Express'});
  else
    res.render('index',{ title: 'Express'});

});

router.get('/form', function(req, res, next) {

  if(!req.user)
    res.render('login',{ title: 'Express'});
  else
    res.render('post',{ title: 'Express'});

});

module.exports = router;
