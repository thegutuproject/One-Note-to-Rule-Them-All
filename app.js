const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();

const environment = process.env.ENVIRONMENT || 'development';

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

module.exports = app;