const express = require('express');
const productManager = require('../managers/ProductManager');

const router = express.Router();
const productManager = new productManager('./productos.json');

router.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const newProduct = await productManager.addProduct({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
        });
        res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
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
        const result = await productManager.deleteProduct(pid);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;