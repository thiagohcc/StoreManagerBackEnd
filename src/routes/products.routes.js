const express = require('express');
const productsControllers = require('../controllers/products.controllers');
const { productValidate } = require('../middlewares/product.validate');

const productsRouter = express.Router();

productsRouter
  .get('/', productsControllers.receiveAllProducts)
  .get('/:id', productsControllers.receiveProductById)
  .post('/', productValidate, productsControllers.createNewProduct);

module.exports = productsRouter;