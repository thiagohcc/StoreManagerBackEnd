const mockProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const mockProductById = {
  "id": 3,
  "name": "Escudo do Capitão América"
};

const mockProductNouFound = [];

const mockNewProduct = {
  name: "New product test",
};

const mockReturnToPostNewProduct = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 999,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const mockProductToEdit = {
  name: "Edit product test",
};

const mockReturnToEditProduct = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
};

const mockDeleteProduct = {
  
}

module.exports = {
  mockProducts,
  mockProductById,
  mockProductNouFound,
  mockNewProduct,
  mockReturnToPostNewProduct,
  mockProductToEdit,
  mockReturnToEditProduct,
};
