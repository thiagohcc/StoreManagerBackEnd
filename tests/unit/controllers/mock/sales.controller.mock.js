const mockAllSales = [
  {
    "saleId": 1,
    "date": "2023-03-28T21:51:53.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-03-28T21:51:53.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-03-28T21:51:53.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const mockSaleById = [
  {
    "date": "2023-03-28T21:51:53.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-03-28T21:51:53.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const mockNewSale = [
  {
    "productId": 2,
    "quantity": 5
  },
  {
    "productId": 1,
    "quantity": 7
  }
];

const mockReturnNewSale = {
  "id": 3
};

const mockUpdateSale = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  }
];

module.exports = {
  mockAllSales,
  mockSaleById,
  mockNewSale,
  mockReturnNewSale,
  mockUpdateSale,
}