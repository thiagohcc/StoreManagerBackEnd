const connection = require('./connection');

const findAllProducts = async () => {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products');
  return data;
};

module.exports = {
  findAllProducts,
};