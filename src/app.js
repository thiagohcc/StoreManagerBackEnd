const express = require('express');
const productsRouter = require('./routes/products.routes');

const app = express();

app.use(express.json());
app.use('/products', productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.get('/', (_req, res) => res.status(200).json({ message: 'oi ' }));

// app.get('/', (req, res) => res.status(200).send({ message: 'OK!' }));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;