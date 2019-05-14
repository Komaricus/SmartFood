const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  consign = require('consign'),
  cors = require('cors'),
  passport = require('passport'),
  passportConfig = require('./passport')(passport),
  jwt = require('jsonwebtoken'),
  config = require('./index.js'),
  database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('smartfridgesecret', config.secret);

consign({ cwd: 'services' })
  .include('SmartFridgeAPI/app/setup')
  .then('SmartFridgeAPI/app/api')
  .then('SmartFridgeAPI/app/routes')
  .into(app);

module.exports = app;