const salesModels = require('../models/sales.models');

const postNewSale = async (data) => {
  const saveSale = await salesModels.saveNewSale(data);
  return { type: null, message: saveSale };
};

module.exports = {
  postNewSale,
};
