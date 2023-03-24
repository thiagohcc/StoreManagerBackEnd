const express = require('express');
const salesControllers = require('../controllers/sales.controllers');
const { validateSale } = require('../middlewares/sale.validate');

const salesRouter = express.Router();

salesRouter
  .post('/', validateSale, salesControllers.receiveNewSale);

module.exports = salesRouter;