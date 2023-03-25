const connection = require('./connection');

const SALES_TABLE = 'StoreManager.sales';
const SALES_PRODUCTS_TABLE = 'StoreManager.sales_products';

const findAllSales = async () => {
  const [data] = await connection.execute(
    `SELECT
      s.id saleId,
      s.date,
      sp.product_id productId,
      sp.quantity
    FROM ${SALES_TABLE} AS s
    INNER JOIN ${SALES_PRODUCTS_TABLE} AS sp
    ON s.id = sp.sale_id`,
  );
  return data;
};

const saveNewSale = async () => {
  const [data] = await connection.execute(
    `INSERT INTO ${SALES_TABLE} (date) VALUES (now())`,
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
  findAllSales,
  saveNewSale,
  saveNewSaleProduct,
};
