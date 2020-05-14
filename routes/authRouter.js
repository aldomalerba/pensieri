var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login',{ title: 'Pensieri Login'});
});

router.get('/google', passport.authenticate('google', {
   scope: ['profile',['email']] 
}));

router.get('/facebook', passport.authenticate('facebook',  { scope: ['email ']}));

router.get('/google/callback', function(req,res,next){
  passport.authenticate('google',function(err, user, info){
    if(err) return;
    if(!user) res.render('login',{
      title: "Pensieri Login",
      error: info.error
    });
    
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req,res,next);
});

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook',function(err, user, info){
    if(err) return;
    if(!user) res.render('login',{
      title: "Pensieri Login",
      error: info.error
    });
    
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req,res,next);

});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
