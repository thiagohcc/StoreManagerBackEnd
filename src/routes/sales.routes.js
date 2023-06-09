const express = require('express');
const salesControllers = require('../controllers/sales.controllers');
const { validateSale, validadeSaleByProductId } = require('../middlewares/sale.validate');

const salesRouter = express.Router();

salesRouter
  .get('/', salesControllers.receiveAllSales)
  .get('/:id', salesControllers.receiveSaleById)
  .post('/', validateSale, validadeSaleByProductId, salesControllers.receiveNewSale)
  .delete('/:id', salesControllers.removeSaleById)
  .put('/:id', validateSale, validadeSaleByProductId, salesControllers.receiveSaleToEdit);

module.exports = salesRouter;