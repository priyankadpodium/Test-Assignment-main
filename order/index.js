'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cron = require("node-cron");
const orderHandler = require('./handler');
// const serverless = require('serverless-http');

//Import Routes
const order = require('./routes/order');

const app = express();

const PORT = 5001;
const HOST = process.env.ORDER_APP_HOST || '0.0.0.0';
const CRONINTERVAL = 5;

// Middlewares setup
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(morgan('combined'))

mongoose.connect('mongodb://mongodb/resthub');
var db = mongoose.connection;

app.use('/order', order)

app.use('*', (req, res) => {
  let noResourceError = { code: 404, message: 'No resource found for this URL' }
  res.status(noResourceError.code);
  res.json({
    code: noResourceError.code,
    message: noResourceError.message
  })
  console.error(JSON.stringify(noResourceError));
})

cron.schedule("*/"+CRONINTERVAL+" * * * * *", function() {
  console.log("Check for orders with order_status = Confirmed");
  orderHandler.checkConfirmed();
});

module.handler = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});