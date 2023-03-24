const salesModels = require('../models/sales.models');

const postNewSale = async (data) => {
  const { insertId } = await salesModels.saveNewSale();
  await data
    .map((sale) => salesModels
      .saveNewSaleProduct({
        saleId: insertId,
        productId: sale.productId,
        quantity: sale.quantity,
      }));
  const savedSale = {
    insertId,
    itemsSold: data,
  };
  return { type: null, message: savedSale };
};

module.exports = {
  postNewSale,
};
