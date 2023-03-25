const express = require('express');
const salesControllers = require('../controllers/sales.controllers');
const { validateSale, validadeSaleByProductId } = require('../middlewares/sale.validate');

const salesRouter = express.Router();

salesRouter
  .get('/', salesControllers.receiveAllSales)
  .post('/', validateSale, validadeSaleByProductId, salesControllers.receiveNewSale);

module.exports = salesRouter;