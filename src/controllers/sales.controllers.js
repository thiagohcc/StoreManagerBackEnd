const salesServices = require('../services/sales.services');

const STATUS_OK = 200;
const STATUS_CREATED = 201;

const receiveAllSales = async (_req, res) => {
  const { message } = await salesServices.getAllSales();
  return res.status(STATUS_OK).json(message);
};

const receiveNewSale = async (req, res) => {
  const data = req.body;
  const { message } = await salesServices.postNewSale(data);
  return res.status(STATUS_CREATED).json(message);
};

module.exports = {
  receiveAllSales,
  receiveNewSale,
};
