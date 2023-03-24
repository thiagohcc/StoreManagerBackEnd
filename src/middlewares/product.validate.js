const STATUS_BAD_REQUEST = 400;
const STATUS_UNPROCESSABLE_CONTENT = 422;

const productValidate = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(STATUS_BAD_REQUEST)
      .json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(STATUS_UNPROCESSABLE_CONTENT)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  productValidate,
};
