const fs = require('fs').promises;

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };
        carts.push(newCart);
        await this.saveCarts(carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === id);
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);

        if (cartIndex === -1) {
            throw new Error("Cart not found");
        }

        const cart = carts[cartIndex];

        const productInCart = cart.products.find(p => p.product === productId);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        await this.saveCarts(carts);
        return cart;
    }
}

module.exports = CartManager;