const mockAllSales = [
  {
    saleId: 3,
    date: "2023-04-01T01:57:58.000Z",
    productId: 6,
    quantity: 5,
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
  },
];

const mockNewSale = [
  {
    productId: 6,
    quantity: 5,
  },
];

const mockSaveNewSale = {
  id: 11,
  itemsSold: [
    {
      productId: 6,
      quantity: 5,
    }
  ]
};

module.exports = {
  mockAllSales,
  mockSaleById,
  mockNewSale,
  mockSaveNewSale,
}