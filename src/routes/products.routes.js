const express = require('express');
const productsControllers = require('../controllers/products.controllers');

const productsRouter = express.Router();

productsRouter
  .get('/', productsControllers.receiveAllProducts)
  .get('/:id', productsControllers.receiveProductById)
  .post('/', productsControllers.createNewProduct);

module.exports = productsRouter;