const express = require('express');
const cartManager = require('../managers/CartManager');

const router = express.Router();
const cartManager = new cartManager('./carts.json');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: "Carrito creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cid);
        res.json({ products: cart.products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

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
