const productsModels = require('../models/products.models');

const getAllProducts = async () => {
  const products = await productsModels.findAllProducts();

  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModels.findProductById(id);
  if (product.length === 0) {
    return { type: null, message: 'Product not found' };
  } 
    return { type: null, message: product };
};

const postNewProduct = async (name) => {
  const { insertId } = await productsModels.saveNewProduct(name);
  const savedProduct = { id: insertId, name };
  return { type: null, message: savedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  postNewProduct,
};
