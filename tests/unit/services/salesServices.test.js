const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesServices = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');

const {
  mockAllSales,
  mockSaleById,
  mockNewSale,
  mockSaveNewSale,
} = require('./mock/sales.services.mock');

describe('tests the services layer of the sales route:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('if all sales are returned', async function () {
    sinon.stub(salesModels, 'findAllSales').resolves(mockAllSales);

    const result = await salesServices.getAllSales();

    expect(result.message).to.be.deep.equal(mockAllSales);
  });

  it('whether it is possible to select a sale through an id', async function () {
    sinon.stub(salesModels, 'findSaleById').resolves(mockSaleById);

    const result = await salesServices.getSaleById(1);

    expect(result.message).to.be.deep.equal(mockSaleById);
  });

  it('if when selecting a sale through an invalid id, it returns an error message', async function () {
    sinon.stub(salesModels, 'findSaleById').resolves([]);

    const result = await salesServices.getSaleById(99999);

    expect(result.message).to.be.equal('Sale not found');
  });

  it('whether it is possible to register a new sale', async function () {
    sinon.stub(salesModels, 'saveNewSale').resolves({ insertId: 11 });
    sinon.stub(salesModels, 'saveNewSaleProduct').resolves(mockSaveNewSale);

    const result = await salesServices.postNewSale(mockNewSale);

    expect(result.message).to.be.deep.equal(mockSaveNewSale);
  });
});
