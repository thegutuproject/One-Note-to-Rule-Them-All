const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/index');
const path = require('path');
const cookieParser = require('cookie-parser');
const helpers = require('./helpers');
const promisify = require("es6-promisify");
require('./handlers/passport');

const errorHandlers = require('./handlers/errorHandlers');

const app = express();

const environment = process.env.NODE_ENV || 'development';

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

// Database connection - Knex
const Knex = require('knex');
const knexConfig = require('./knexfile')[environment];
const { Model } = require('objection');

// Initialize knex.
const knexConnection = Knex(knexConfig);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knexConnection);

// Passport JS is what we use to handle our logins
app.use(passport.initialize());

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