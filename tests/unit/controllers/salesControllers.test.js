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
  mockUpdateSale,
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

  it('if it is possible to delete a sale through an id', async function () {
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getSaleToDelete')
      .resolves({ type: null }
    );

    await salesControllers.removeSaleById(req, res);
    
    expect(res.status).to.have.been.calledWith(204);
  });

  it('if not is possible to delete a sale through an invalid id', async function () {
    const req = { params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getSaleToDelete')
      .resolves({ type: 404, message: 'Sale not found' }
      );

    await salesControllers.removeSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('if it is possible to edit a sale through an id', async function () {
    const req = { body: mockUpdateSale, params: { id: 3 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getSaleToEdit')
      .resolves({ type: null, message: { saleId: 3, itemsUpdated: mockUpdateSale } }
    );
    
    await salesControllers.receiveSaleToEdit(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: 3, itemsUpdated: mockUpdateSale });
  });

  it('if not is possible to edit a sale through an invalid id', async function () {
    const req = { body: mockUpdateSale, params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'getSaleToEdit')
      .resolves({ type: 404, message: 'Sale not found' });

    await salesControllers.receiveSaleToEdit(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});