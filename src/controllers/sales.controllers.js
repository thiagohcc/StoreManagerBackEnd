const salesServices = require('../services/sales.services');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
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

module.exports = {
  receiveAllSales,
  receiveSaleById,
  receiveNewSale,
};
