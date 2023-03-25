const productsServices = require('../services/products.services');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOT_FOUND = 404;

const receiveAllProducts = async (_req, res) => {
  const { message } = await productsServices.getAllProducts();
  return res.status(STATUS_OK).json(message);
};

const receiveProductById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsServices.getProductById(+id);
  if (!message[0].id) {
    return res.status(STATUS_NOT_FOUND).json({ message });
  }
  return res.status(STATUS_OK).json(message[0]);
};

const createNewProduct = async (req, res) => {
  const data = req.body;
  const { message } = await productsServices.postNewProduct(data.name);
  return res.status(STATUS_CREATED).json(message);
};

const editProductById = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { message } = await productsServices.getproductToEdit(id, name);
  if (!message.name) {
    return res.status(STATUS_NOT_FOUND).json({ message });
  }
  return res.status(STATUS_OK).json(message);
};

module.exports = {
  receiveAllProducts,
  receiveProductById,
  createNewProduct,
  editProductById,
};
