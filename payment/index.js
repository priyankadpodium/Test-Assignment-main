'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const serverless = require('serverless-http');

//Import Routes
const payment = require('./routes/payment');

// App
const app = express();

// Constants
const PORT = 5003;
const HOST = process.env.PAYMENT_APP_HOST || '0.0.0.0';

// Middlewares
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(morgan('combined'))

mongoose.connect('mongodb://mongodb/resthub');
var db = mongoose.connection;

app.use('/payment', payment)

app.use('*', (req, res) => {
  let noResourceError = { code: 404, message: 'No resource found for this URL' }
  res.status(noResourceError.code);
  res.json({
    code: noResourceError.code,
    message: noResourceError.message
  })
  console.error(JSON.stringify(noResourceError));
})

module.handler = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});