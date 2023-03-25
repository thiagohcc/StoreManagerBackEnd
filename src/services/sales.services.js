const salesModels = require('../models/sales.models');

const getAllSales = async () => {
  const sales = await salesModels.findAllSales();
  return { type: null, message: sales };
};

const postNewSale = async (data) => {
  const { insertId } = await salesModels.saveNewSale();
  const newSale = data.map((sale) => salesModels
    .saveNewSaleProduct({
      saleId: insertId,
      productId: sale.productId,
      quantity: sale.quantity,
  }));
    
  await Promise.all(newSale);

  const savedSale = { id: insertId, itemsSold: data };
  return { type: null, message: savedSale };
};

module.exports = {
  getAllSales,
  postNewSale,
};
