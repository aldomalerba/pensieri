var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy  = require('passport-google-oauth');
var configAuth = require('./config/auth');
var configSession = require('./config/session');

var GoogleStrategy = GoogleStrategy.OAuth2Strategy;

var indexRouter = require('./routes/index');
var pensieriRoute = require('./routes/pensieri');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express-session setup 
app.use(session({
  secret: configSession.sessionSecret,
  resave: true, 
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user)
});
passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user)
});

passport.use(new GoogleStrategy({
  clientID: configAuth.googleOAuth2.clientID,
  clientSecret: configAuth.googleOAuth2.clientSecret,
  callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    let user = {};
    console.log(profile);
    user.googleId = profile.id;
  done(null, user);
}));

app.use('/', indexRouter);
app.use('/api/pensieri', pensieriRoute);
app.use('/auth', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
