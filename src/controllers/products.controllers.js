const productsServices = require('../services/products.services');

const STATUS_OK = 200;
const NOT_FOUND = 404;

const receiveAllProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(STATUS_OK).json(message);
};

const receiveProductById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsServices.getProductById(+id);
  if (!message[0].id) {
    return res.status(NOT_FOUND).json({ message });
  }
  return res.status(STATUS_OK).json(message[0]);
};

const createNewProduct = async (req, res) => {
  const data = req.body;
  const { message } = await productsServices.postNewProduct(data.name);
  return res.status().json(message[0]);
};

module.exports = {
  receiveAllProducts,
  receiveProductById,
  createNewProduct,
};
