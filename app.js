const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/index');
const path = require('path');
const cookieParser = require('cookie-parser');
const helpers = require('./helpers');
require('./handlers/passport');

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

// Passport JS is what we use to handle our logins
// app.use(passport.initialize());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentPath = req.path;
  next();
});

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

app.use('/', routes);

module.exports = app;