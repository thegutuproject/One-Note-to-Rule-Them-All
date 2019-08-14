const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();

const environment = process.env.ENVIRONMENT || 'development';

// Database connection - Knex
const Knex = require('knex');
const knexConfig = require('./knexfile')[environment];
const { Model } = require('objection');


// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize knex.
const knexConnection = Knex(knexConfig);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knexConnection);

app.use('/', routes);

module.exports = app;