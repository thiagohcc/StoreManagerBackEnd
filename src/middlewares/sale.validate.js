const productsModels = require('../models/products.models');

const STATUS_BAD_REQUEST = 400;
const STATUS_UNPROCESSABLE_CONTENT = 422;
const STATUS_NOT_FOUND = 404;

const validateSale = (req, res, next) => {
  const sale = req.body;
  const checkProductIdNotExists = sale.some(({ productId }) => productId === undefined);
  const checkQuantiyNotExists = sale.some(({ quantity }) => quantity === undefined);
  const checkQuantutyValid = sale.some(({ quantity }) => quantity <= 0);
  if (checkProductIdNotExists) {
    return res.status(STATUS_BAD_REQUEST).json({ message: '"productId" is required' });
  }
  if (checkQuantiyNotExists) {
    return res.status(STATUS_BAD_REQUEST).json({ message: '"quantity" is required' });
  }
  if (checkQuantutyValid) {
    return res.status(STATUS_UNPROCESSABLE_CONTENT)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validadeSaleByProductId = async (req, res, next) => {
  const sale = req.body;
  const productIdsOfsale = sale.map(({ productId }) => +productId);

  const products = await productsModels.findAllProducts();
  const idsCadastrados = products.map((p) => p.id);

  const checkProductIdAlreadyExists = productIdsOfsale
    .every((idSales) => idsCadastrados.includes(idSales));
  
  if (!checkProductIdAlreadyExists) {
    return res.status(STATUS_NOT_FOUND).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateSale,
  validadeSaleByProductId,
};
