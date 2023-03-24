const STATUS_BAD_REQUEST = 400;
const STATUS_UNPROCESSABLE_CONTENT = 422;
// const STATUS_NOT_FOUND = 404;

const validateSale = (req, res, next) => {
  const sale = req.body;
  sale
    .forEach(({ productId, quantity }) => {
      if (productId === undefined) {
        return res.status(STATUS_BAD_REQUEST)
          .json({ message: '"productId" is required' });
      }
      if (quantity === undefined) {
        return res.status(STATUS_BAD_REQUEST)
          .json({ message: '"quantity" is required' });
      }
      if (quantity <= 0) {
        return res.status(STATUS_UNPROCESSABLE_CONTENT)
          .json({ message: '"quantity" must be greater than or equal to 1' });
      }
    });
  next();
};

module.exports = {
  validateSale,
};
