const salesModels = require('../models/sales.models');

const getAllSales = async () => {
  const sales = await salesModels.findAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModels.findSaleById(id);
  if (sale.length === 0) {
    return { type: null, message: 'Sale not found' };
  }
  return { type: null, message: sale };
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

const getSaleToDelete = async (id) => {
  const { affectedRows } = await salesModels.deleteSaleById(id);
  if (!affectedRows) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null };
};

const getSaleToEdit = async (id, data) => {
  const { affectedRows } = await salesModels.editSaleById(id);
  const updateSalesProducts = data.map((saleProducts) => salesModels
    .editSaleProduct(id, {
      productId: saleProducts.productId,
      quantity: saleProducts.quantity,
    }));
  
  await Promise.all(updateSalesProducts);
  const updatedSale = { saleId: id, itemsUpdated: data };
  if (!affectedRows) {
    return { type: 404, message: 'Sale not found' };
  }
  return ({ type: null, message: updatedSale });
};

module.exports = {
  getAllSales,
  postNewSale,
  getSaleById,
  getSaleToDelete,
  getSaleToEdit,
};
