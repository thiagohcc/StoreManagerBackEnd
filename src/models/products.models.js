const connection = require('./connection');

const findAllProducts = async () => {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products');
  return data;
};

const findProductById = async (id) => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return data;
};

module.exports = {
  findAllProducts,
  findProductById,
};