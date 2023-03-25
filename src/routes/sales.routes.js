const express = require('express');
const salesControllers = require('../controllers/sales.controllers');
const { validateSale, validadeSaleByProductId } = require('../middlewares/sale.validate');

const salesRouter = express.Router();

salesRouter
  .post('/', validateSale, validadeSaleByProductId, salesControllers.receiveNewSale);

module.exports = salesRouter;