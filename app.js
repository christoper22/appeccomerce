//default environment
require('dotenv').config();

const express = require('express');
require('express-group-routes'); //express group install first npm

const path = require('path');
const app = express();
const methodOverride = require('method-override'); //install first method override
//router
const userRouter = require('./routes/users');
const itemRouter = require('./routes/items');
const orderRouter = require('./routes/orders');
//handler err
const logger = require('./middleware/errorhandler/error');
// app.engine('ejs', ejsMate)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.group('/ecommerce', (router) => {
  router.use('/users', userRouter);
  router.use('/items', itemRouter);
  router.use('/orders', orderRouter);
});

app.use('*', (req, res, next) => {
  return res.status(404).json({
    message: 'endpoint not found',
  });
});

app.use((err, req, res, next) => {
  logger.error(JSON.stringify(err));
  const status = err.code || 500;
  const message = err.message || 'internal server error';

  return res.status(status).json({
    message,
  });
});

module.exports = app;
