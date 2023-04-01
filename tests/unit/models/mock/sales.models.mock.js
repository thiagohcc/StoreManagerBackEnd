const mockAllSales = [
  {
    saleId: 6,
    date: "2023-04-01T01:58:40.000Z",
    productId: 6,
    quantity: 5,
  },
  {
    saleId: 6,
    date: "2023-04-01T01:58:40.000Z",
    productId: 7,
    quantity: 7,
  }
];

const mockSaleById = [
  {
    date: "2023-04-01T01:57:58.000Z",
    productId: 6,
    quantity: 5,
  },
  {
    date: "2023-04-01T01:57:58.000Z",
    productId: 7,
    quantity: 7,
  }
];

const mockNewSale = {
  id: 7,
  itemsSold: [
    {
      productId: 6,
      quantity: 5,
    },
    {
      productId: 7,
      quantity: 7,
    }
  ]
};

const mockResultSaveNewSaleProduct = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const mockNewSaleProduct = {
  productId: 6,
  quantity: 5,
};

module.exports = {
  mockAllSales,
  mockSaleById,
  mockNewSale,
  mockResultSaveNewSaleProduct,
  mockNewSaleProduct,
};
