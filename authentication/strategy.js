const configAuth = require('../config/auth');
const User = require('../database/models').User
const GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const googleStrategy = new GoogleStrategy({
    clientID: configAuth.googleOAuth2.clientID,
    clientSecret: configAuth.googleOAuth2.clientSecret,
    callbackURL: "/auth/google/callback",
  }, (accessToken, refreshToken, profile, done) => {
    
    User.findOne({where:{
      email : profile._json.email
    }})
    .then((user) => { 
        if(user){
          done(null, user);
        }
        else{
          
          User.createUsernameByDisplayName(profile.displayName)
          .then(function(username){
            let data = {
              username: username,
              email : profile._json.email,
              displayName : profile.displayName,
              provider : profile.provider,
              picture: profile._json.picture
            };

            User.create(data)
            .then(function(createdUser){
              if(!createdUser)
                done(null, false);
              else
                done(null, createdUser);
            });
          });
          
        }
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
  User.findOne({where:{
    email : profile._json.email
  }})
  .then((user) => { 
      if(user){
        done(null, user);
      }
      else{
        
        User.createUsernameByDisplayName(profile.displayName)
        .then(function(username){
          let data = {
            username: username,
            email : profile._json.email,
            displayName : profile.displayName,
            provider : profile.provider,
            picture: profile.photos ? profile.photos[0].value : '/images/faces/unknown-user-pic.jpg'
          };

          User.create(data)
          .then(function(createdUser){
            if(!createdUser)
              done(null, false);
            else
              done(null, createdUser);
          });
        });
        
        
      }
  }).catch((err) => {
    done(err);
  });
});

module.exports = {
    Google : googleStrategy,
    Facebook : facebookStrategy
}