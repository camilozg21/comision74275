const express = require('express');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const cartsRouter = require('./routes/cartsRouter');
const productRouter = require('./routes/ProductRouter');

const app = express();
const PORT = 8080;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);


const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

app.set('io', io);

io.on('connection', async (socket) => {
    console.log('Cliente conectado a realTimeProducts');
    
    const products = await productManager.getProducts();
    socket.emit('productos-actualizados', products);
});