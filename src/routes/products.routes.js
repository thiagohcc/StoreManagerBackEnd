const express = require('express');
const productsControllers = require('../controllers/products.controllers');
const { productValidate } = require('../middlewares/product.validate');

const productsRouter = express.Router();

productsRouter
  .get('/', productsControllers.receiveAllProducts)
  .get('/:id', productsControllers.receiveProductById)
  .post('/', productValidate, productsControllers.createNewProduct)
  .put('/:id', productValidate, productsControllers.editProductById)
  .delete('/:id', productsControllers.removeProductById);
  // .get('/search', productsControllers.receivePorductsByQuery);

module.exports = productsRouter;