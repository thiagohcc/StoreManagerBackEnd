const productsServices = require('../services/products.services');

const STATUS_OK = 200;

const receiveAllProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(STATUS_OK).json(message);
};

const receiveProductById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsServices.getProductById(+id);
  return res.status(STATUS_OK).json({ message });
};

module.exports = {
  receiveAllProducts,
  receiveProductById,
};
