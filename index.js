require('./config/config.js');

const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const raven = require('raven');

const landing = require('./app/routes');

const app = express();

// connect to Mongo when the app initializes
mongoose.connect(process.env.DB_PATH, { useMongoClient: true });

// Configure Raven (Sentry) to report errors.
raven.config(process.env.SENTRY_DSN).install();
app.use(raven.requestHandler());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(validator({
  customValidators: {
  },
  customSanitizers: {
  },
}));

app.get('*', (req, res, next) => {
  next();
});

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  return next();
});

app.use('/', landing);

app.listen(process.env.LISTENER_PORT, () => {
  console.log(`App is listening on port ${process.env.LISTENER_PORT}`);
});
