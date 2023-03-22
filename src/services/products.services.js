const productsModels = require('../models/products.models');

const getAllProducts = async () => {
  const products = await productsModels.findAllProducts();

  return { type: null, message: products };
};

module.exports = {
  getAllProducts,
};
