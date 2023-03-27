const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsControllers = require('../../../src/controllers/products.controllers');
const productsServices = require('../../../src/services/products.services');

const { mockProducts, mockProductById } = require('./mock/products.controller.mock');

describe('Unit tests in the controller layer for', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('check if the GET method returns all products', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'getAllProducts')
      .resolves({ type: null, message: mockProducts });

    await productsControllers.receiveAllProducts(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProducts);
  });
  
  it('checks if sending an id by the GET method returns a product correctly', async function () {
    const req = { params: { id: 3 }};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
    .stub(productsServices, 'getProductById')
    .resolves({ type: null, message: [mockProductById] });
    
    await productsControllers.receiveProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProductById);
  });
});

