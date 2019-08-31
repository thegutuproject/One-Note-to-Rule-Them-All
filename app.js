const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/index');
const path = require('path');
const cookieParser = require('cookie-parser');
const helpers = require('./helpers');
const promisify = require("es6-promisify");

/**
 * Session stuff
 * I gave up on JWT, since that is primarily used for API servers anyway.
 * I suppose it's possible to roll out a custom solution where the JWT is
 * stored in the cookie, and authentication verification is done via cookie
 * checking
 */
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');

const environment = process.env.NODE_ENV || 'development';

/**
 * Database connection - Knex
 */
const Knex = require('knex');
const knexConfig = require('./knexfile')[environment];
const knexConnection = Knex(knexConfig);
const { Model } = require('objection');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knexConnection);

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    tablename: 'sessions',
    sidfieldname: 'sid',
    knex: knexConnection,
    createtable: false,
    clearInterval: 60000
  })
}));

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());


// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
// app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
// app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
// if (app.get('env') === 'development') {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

// production error handler
// app.use(errorHandlers.productionErrors);

module.exports = app;