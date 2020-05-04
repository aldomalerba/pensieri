var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('login',{ title: 'Express'});

});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failure: '/login'
})) ;

module.exports = router;
