const express = require('express');
const cartsRouter = require('./routes/cartsRouter');
const productRouter = require('./routes/ProductRouter');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});