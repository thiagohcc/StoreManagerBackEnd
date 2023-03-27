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

const getproductToEdit = async (id, name) => {
  const { affectedRows } = await productsModels.saveEditedProduct(id, name);
  if (!affectedRows) {
    return { type: null, message: 'Product not found' };
  }
  return { type: null, message: { id, name } };
};

const getProductToDelete = async (id) => {
  const { affectedRows } = await productsModels.deleteProductById(id);
  if (!affectedRows) {
    return { type: null, message: 'Product not found' };
  }
  return { type: null };
};

module.exports = {
  getAllProducts,
  getProductById,
  postNewProduct,
  getproductToEdit,
  getProductToDelete,
};
