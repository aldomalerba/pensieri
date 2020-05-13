var googleOAuth2 = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
};

var facebookAuth = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret : process.env.FACEBOOK_SECRET_KEY
}

module.exports = {
    googleOAuth2 : googleOAuth2,
    facebook : facebookAuth
};
