const productsModels = require('../models/products.models');

const getAllProducts = async () => {
  const products = await productsModels.findAllProducts();

  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModels.findProductById(id);
  if (!product) {
    return { type: null, message: 'Product not found' };
  } 
    return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
