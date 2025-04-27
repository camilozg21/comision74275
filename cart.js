const express = require('express');
const CartManager = require('./CartManager');

const router = express.Router();
const cartManager = new CartManager('./carts.json');

// Middleware para parsear JSON
router.use(express.json());

// POST / (crear carrito)
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: "Carrito creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /:cid (obtener productos de un carrito)
router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cid);
        res.json({ products: cart.products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /:cid/product/:pid (agregar producto al carrito)
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.json({ message: "Producto agregado al carrito", cart: updatedCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
