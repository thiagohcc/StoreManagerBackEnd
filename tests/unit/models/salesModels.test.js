const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const connection = require('../../../src/models/connection');
const salesModels = require('../../../src/models/sales.models');

const {
  mockAllSales,
  mockSaleById,
  mockNewSale,
  mockResultSaveNewSaleProduct,
  mockNewSaleProduct,
} = require('./mock/sales.models.mock');

describe('tests the models layer of the sales route:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('if all products are returned correctly', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllSales]);

    const result = await salesModels.findAllSales();

    expect(result).to.be.deep.equal(mockAllSales);
  });

  it('whether it is possible to locate a sale by sending an id', async function () {
    sinon.stub(connection, 'execute').resolves([mockSaleById]);

    const result = await salesModels.findSaleById(3);

    expect(result).to.be.deep.equal(mockSaleById);
  });

  it('if it is possible to register a new sales id', async function () {
    sinon.stub(connection, 'execute').resolves([mockNewSale]);

    const result = await salesModels.saveNewSale(mockNewSale.itemsSold);

    expect(result).to.be.deep.equal(mockNewSale);
  });

  it('whether it is possible to register a new sale', async function () {
    sinon.stub(connection, 'execute').resolves([mockResultSaveNewSaleProduct]);

    const result = await salesModels.saveNewSaleProduct({ saleId: 1, ...mockNewSaleProduct });

    expect(result.affectedRows).to.be.equal(1);
  });
});
