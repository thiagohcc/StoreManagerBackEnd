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

const mockSaleToEdit = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const mockSaleEdited = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10
    },
    {
      productId: 2,
      quantity: 50,
    },
  ]
};

module.exports = {
  mockAllSales,
  mockSaleById,
  mockNewSale,
  mockSaveNewSale,
  mockSaleToEdit,
  mockSaleEdited,
}