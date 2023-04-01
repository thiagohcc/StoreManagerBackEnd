const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const {
  mockProducts,
  mockProductById,
  mockProductNouFound,
  mockNewProduct,
  mockReturnToPostNewProduct,
  mockProductToEdit,
  mockReturnToEditProduct,
} = require('./mock/products.services.mock');

describe('Test the "service" layer of the "/products" route:', function () {
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

  it('if it is possible to register a new product', async function () {
    sinon.stub(productsModels, 'saveNewProduct').resolves(mockReturnToPostNewProduct);
    
    const result = await productsServices.postNewProduct(mockNewProduct.name);
    const toExpect = { id: mockReturnToPostNewProduct.insertId, name: mockNewProduct.name };

    expect(result.message).to.be.deep.equal(toExpect);
  });

  it('if when editing a product, it returns the edited product correctly', async function () {
    sinon.stub(productsModels, 'saveEditedProduct').resolves(mockReturnToEditProduct);

    const result = await productsServices.getproductToEdit(999, mockProductToEdit.name);
    const toExpect = { id: 999, name: mockProductToEdit.name };

    expect(result.message).to.be.deep.equal(toExpect);
  });

  it('if when editing a product with an invalid id, it returns an error message', async function () {
    sinon.stub(productsModels, 'saveEditedProduct').resolves({ message: 'Product not found' });

    const result = await productsServices.getproductToEdit(999, mockProductToEdit.name);

    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('if it is possible to delete a product through an id', async function () {
    sinon.stub(productsModels, 'deleteProductById').resolves({ affectedRows: 1 });

    const result = await productsServices.getProductToDelete(3);

    expect(result).not.to.be.haveOwnProperty('message');
  });

  it('if it is not possible to delete a product through an invalid id', async function () {
    sinon.stub(productsModels, 'deleteProductById').resolves({ affectedRows: 0 });

    const result = await productsServices.getProductToDelete(3);

    expect(result.message).not.to.be.haveOwnProperty('Product not found');
  });
});