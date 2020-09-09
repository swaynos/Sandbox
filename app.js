const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

const auth = require('./auth');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const puzzleRouter = require('./routes/puzzle');

// App initialization
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(auth.oidc.router);
// // Tack a user object onto each request if possible
// function addUser(req, res, next) { // ToDo: move out to middleware.js
//   console.log('addUser');
//   const { userContext } = req;
//   if (!!userContext) {
//     auth.oktaClient.getUser(userContext.userinfo.sub)
//     .then(user => {
//       res.locals.user = user;
//       next();
//     }).catch(err => {
//       next(err);
//     });
//   }
//   next();
// };
// app.use(addUser);

// Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/puzzle', auth.oidc.ensureAuthenticated(), puzzleRouter);

// Error handlers
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
