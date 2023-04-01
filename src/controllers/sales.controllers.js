const salesServices = require('../services/sales.services');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const STATUS_NOT_FOUND = 404;

const receiveAllSales = async (_req, res) => {
  const { message } = await salesServices.getAllSales();
  return res.status(STATUS_OK).json(message);
};

const receiveSaleById = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesServices.getSaleById(+id);
  if (!message[0].date) {
    return res.status(STATUS_NOT_FOUND).json({ message });
  }
  return res.status(STATUS_OK).json(message);
};

const receiveNewSale = async (req, res) => {
  const data = req.body;
  const { message } = await salesServices.postNewSale(data);
  return res.status(STATUS_CREATED).json(message);
};

const removeSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.getSaleToDelete(+id);
  if (type === STATUS_NOT_FOUND) {
    return res.status(STATUS_NOT_FOUND).json({ message });
  }
  return res.status(STATUS_NO_CONTENT).end();
};

const receiveSaleToEdit = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { type, message } = await salesServices.getSaleToEdit(+id, data);
  if (type === STATUS_NOT_FOUND) {
    return res.status(STATUS_NOT_FOUND).json({ message });
  }
  return res.status(STATUS_OK).json(message);
};

module.exports = {
  receiveAllSales,
  receiveSaleById,
  receiveNewSale,
  removeSaleById,
  receiveSaleToEdit,
};
