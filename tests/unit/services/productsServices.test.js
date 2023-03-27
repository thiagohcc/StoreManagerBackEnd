const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const { mockProducts, mockProductById, mockProductNouFound } = require('./mock/products.services.mock');

describe('Test the "serice" layer of the "/products" route:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('if you receive all products from models', async function () {
    sinon.stub(productsModels, 'findAllProducts').resolves(mockProducts);

    const result = await productsServices.getAllProducts();

    expect(result.message).to.be.deep.equal(mockProducts);
  });

  it('if you receive a product searched by an id', async function () {
    sinon.stub(productsModels, 'findProductById').resolves(mockProductById);

    const result = await productsServices.getProductById(3);

    expect(result.message).to.be.deep.equal(mockProductById);
  });

  it('if you receive a "not found" message if the id is invalid', async function () {
    sinon.stub(productsModels, 'findProductById').resolves(mockProductNouFound);

    const result = await productsServices.getProductById(999);

    expect(result.message).to.be.equal('Product not found');
  });
});