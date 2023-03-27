const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const connection = require('../../../src/models/connection')
const productsModels = require('../../../src/models/products.models');
const { mockProducts, mockProductById, mockProductNouFound } = require('./mock/products.models.mock');


describe('Tests the models layer of the /product route', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('if all products are returned', async function () {
    sinon.stub(connection, 'execute').resolves([mockProducts]);

    const products = await productsModels.findAllProducts();

    expect(products).to.be.deep.equal(mockProducts);
  });

  it('if it returns a product searched by an id', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductById]);

    const product = await productsModels.findProductById(3);

    expect(product.id).to.be.equal(mockProductById.id);
  });

  it('if you receive an empty array if the id is invalid', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductNouFound]);

    const result = await productsModels.findProductById(999);

    expect(result).to.have.lengthOf(mockProductNouFound);
  });


});