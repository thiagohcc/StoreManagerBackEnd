const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsControllers = require('../../../src/controllers/products.controllers');
const productsServices = require('../../../src/services/products.services');

const {
  mockProducts,
  mockProductById,
  mockNewProduct,
  mockEditProduct,
} = require('./mock/products.controller.mock');

describe('PRODUCTS CONTROLLERS - Unit tests in the controller layer for', function () {
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

  it('checks if sending an invalid id by the GET method returns a errro message', async function () {
    const req = { params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'getProductById')
      .resolves({ type: null, message: 'Product not found' });

    await productsControllers.receiveProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it('whether you receive the correct value when creating a new product', async function () {
    const req = { body: { name: 'Test to creat product' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'postNewProduct')
      .resolves({ type: null, message: mockNewProduct });
    
    await productsControllers.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockNewProduct);
  });

  it('whether you receive the correct value when editing a product', async function () {
    const req = { params: { id: 3 }, body: { name: 'Test to edit product' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'getproductToEdit')
      .resolves({ type: null, message: mockEditProduct });
    
    await productsControllers.editProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockEditProduct);
  });

  it('whether you receive the error message when editing a product by a invalid id', async function () {
    const req = { params: { id: 999 }, body: { name: 'Test to edit product' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'getproductToEdit')
      .resolves({ type: null, message: 'Product not found' });
    
    await productsControllers.editProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it('if when deleting a product by id, it is deleted correctly', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon
      .stub(productsServices, 'getProductToDelete')
      .resolves({ type: null });
    
    await productsControllers.removeProductById(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('if when deleting a product an invalid id, returns a message error', async function () {
    const req = { params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'getProductToDelete')
      .resolves({ type: null, message: 'Product not found' });

    await productsControllers.removeProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  });
});

