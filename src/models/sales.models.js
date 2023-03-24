const connection = require('./connection');

const SALES_TABLE = 'StoreManager.sales';
const SALES_PRODUCTS_TABLE = 'StoreManager.sales_products';

const saveNewSale = async () => {
  const [data] = await connection.execute(
    `INSERT INTO ${SALES_TABLE} () VALUES ()`,
  );
  return data;
};

const saveNewSaleProduct = async (saleData) => {
  const { saleId, productId, quantity } = saleData;
  const [data] = await connection.execute(
    `INSERT INTO ${SALES_PRODUCTS_TABLE} (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );
  return data;
};

module.exports = {
  saveNewSale,
  saveNewSaleProduct,
};
