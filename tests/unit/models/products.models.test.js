const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const connection = require('../../../src/models/connection')
const productsModels = require('../../../src/models/products.models');
const {
  mockProducts,
  mockProductById,
  mockProductNouFound,
  mockNewProduct,
  mockEditedProduct,
  mockProductByQuery,
} = require('./mock/products.models.mock');


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

  it('whether it is possible to save a new product in the database', async function () {
    sinon.stub(connection, 'execute').resolves([mockNewProduct]);

    const result = await productsModels.saveNewProduct(mockNewProduct.name);

    expect(result).to.be.deep.equal(mockNewProduct);
  });

  it('whether it is possible to edit a product', async function () {
    sinon.stub(connection, 'execute').resolves([mockEditedProduct]);

    const result = await productsModels.saveEditedProduct(mockEditedProduct.id, mockEditedProduct.name);

    expect(result).to.be.deep.equal(mockEditedProduct);
  });

  it('whether it is possible to delete a product', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModels.deleteProductById(123456);

    expect(result.affectedRows).to.be.equal(1);
  });

  it('if the database returns the products based on the query sent', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductByQuery]);

    const result = await productsModels.getProductsByQuery('Martelo');

    expect(result).to.have.length(1);
    expect(result[0]).to.haveOwnProperty('id');
    expect(result[0]).to.haveOwnProperty('name');
    expect(result[0]).to.be.deep.equal(mockProductByQuery[0]);
  });
});