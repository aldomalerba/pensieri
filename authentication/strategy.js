const configAuth = require('../config/auth');
const User = require('../database/models').User
const GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const googleStrategy = new GoogleStrategy({
    clientID: configAuth.googleOAuth2.clientID,
    clientSecret: configAuth.googleOAuth2.clientSecret,
    callbackURL: "/auth/google/callback",
  }, (accessToken, refreshToken, profile, done) => {

    User.findOne({where:{ email : profile._json.email }})
    .then((user) => { 
        if(!user){
          done(null, false, { error : { staus: 404, message: "Email not exists" }});
        } 
        let userSession = {
          id : user.id
        };
        done(null, userSession);
    }).catch((err) => {
      done(err);
    });

});

const facebookStrategy = new FacebookStrategy({
  clientID: configAuth.facebook.clientID,
  clientSecret: configAuth.facebook.clientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({where:{ email : profile._json.email }})
  .then((user) => { 
      if(!user){
        done(null, false, { error : { staus: 404, message: "Email not exists" }});
      } 
      let userSession = {
        id : user.id
      };
      done(null, userSession);
  }).catch((err) => {
    done(err);
  });
});

module.exports = {
    Google : googleStrategy,
    Facebook : facebookStrategy
}