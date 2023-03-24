const connection = require('./connection');

const PRODUCT_TABLE = 'StoreManager.products';

const findAllProducts = async () => {
  const [data] = await connection.execute(`SELECT * FROM ${PRODUCT_TABLE}`);
  return data;
};

const findProductById = async (id) => {
  const [data] = await connection.execute(
    `SELECT * FROM ${PRODUCT_TABLE} WHERE id = ?`,
    [id],
  );
  return data;
};

const saveNewProduct = async (name) => {
  const [data] = await connection.execute(
    `INSERT INTO ${PRODUCT_TABLE} (name) VALUES (?)`,
    [name],
  );
  return data;
};

module.exports = {
  findAllProducts,
  findProductById,
  saveNewProduct,
};