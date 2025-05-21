const express = require('express');
const productManager = require('../public/js/ProductManager');

const router = express.Router();
const productManager = new productManager('./productos.json');

router.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', {
            title: 'Lista de productos',
            products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);
        res.json({ product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/', async (req, res) => {
    try {
        await productManager.addProduct(req.body);
        const products = await productManager.getProducts();
        req.app.get('io').emit('productos-actualizados', products);
        res.status(201).json({ message: 'Producto agregado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const updatedFields = req.body;
        const updatedProduct = await productManager.updateProduct(pid, updatedFields);
        res.json({ message: "Producto actualizado", product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        await productManager.deleteProduct(pid);
        const products = await productManager.getProducts();
        req.app.get('io').emit('productos-actualizados', products);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;