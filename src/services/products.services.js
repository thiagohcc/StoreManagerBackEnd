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
  const newProductSaved = productsModels.saveNewProduct(name);
  console.log(newProductSaved);
  return { type: null, message: newProductSaved };
};

module.exports = {
  getAllProducts,
  getProductById,
  postNewProduct,
};
