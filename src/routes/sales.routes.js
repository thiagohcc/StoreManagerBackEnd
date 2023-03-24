const express = require('express');
const salesControllers = require('../controllers/sales.controllers');

const salesRouter = express.Router();

salesRouter
  .post('/', salesControllers.receiveNewSale);

module.exports = salesRouter;