require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var authSrategy = require('./authentication/strategy');
var configSession = require('./config/session');
var indexRouter = require('./routes/index');
var pensieriRouter = require('./routes/api/pensieriRouter');
var likeRouter = require('./routes/api/likeRouter');
var loginRouter = require('./routes/authRouter');
var profileRouter = require('./routes/profileRouter');

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
passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((user, done) => { done(null, user) });

passport.use(authSrategy.Google);
passport.use(authSrategy.Facebook);

app.use('/', indexRouter);
app.use('/api/pensieri', pensieriRouter);
app.use('/api/like', likeRouter);
app.use('/auth', loginRouter);
app.use('/profile', profileRouter);

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
