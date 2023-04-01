const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');

const {
  mockAllSales,
  mockSaleById,
  mockNewSale,
} = require('./mock/sales.controller.mock');

describe('Tests the "controllers" layer of the "/sales" route:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('if you receive all the sales correctly', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getAllSales')
      .resolves({ type: null, message: mockAllSales });
    
    await salesControllers.receiveAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllSales);
  });

  it('if when sending an id, you receive the correct sale', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getSaleById')
      .resolves({ type: null, message: mockSaleById });
    
    await salesControllers.receiveSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSaleById);
  });

  it('if when sending an invalid id, you receive a error message', async function () {
    const req = { params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getSaleById')
      .resolves({ type: null, message: 'Sale not found' });

    await salesControllers.receiveSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found'});
  });

  it('if when sending a new sale you receive the correct message', async function () {
    const req = { body: mockNewSale };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'postNewSale')
      .resolves({ type: null, message: { id: res.id, itemsSold: mockNewSale } })
    
    await salesControllers.receiveNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

});