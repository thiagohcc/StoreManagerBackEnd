const salesServices = require('../services/sales.services');

const STATUS_CREATED = 201;
// const STATUS_NOT_FOUND = 404;

const receiveNewSale = async (req, res) => {
  const data = req.body;
  const { message } = await salesServices.postNewSale(data);
  return res.status(STATUS_CREATED).json(message);
};

module.exports = {
  receiveNewSale,
};
