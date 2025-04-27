const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const { title, description, code, price, status, stock, category, thumbnails } = product;

        if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnails) {
            throw new Error("Todos los campos son obligatorios.");
        }

        const codeExists = products.some(p => p.code === code);
        if (codeExists) {
            throw new Error(`El código "${code}" ya existe.`);
        }

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        if (!product) {
            throw new Error("Not found");
        }
            return product;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error("Product not found");
        }

        if (updatedFields.hasOwnProperty('id')) {
            delete updatedFields.id;
        }

        products[index] = { ...products[index], ...updatedFields };

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error("Product not found");
        }

        products.splice(index, 1);

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return { message: `Producto con id ${id} eliminado.` };
    }
}

module.exports = ProductManager;