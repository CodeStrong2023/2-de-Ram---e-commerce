import cartRepository from '../repositories/cart.repository.js';
import productRepository from '../repositories/product.repository.js';

export default class CartService {
    async addToCart(userId, productId, quantity) {
        try {
            const cart = await cartRepository.findCartByUserId(userId);
            const product = await productRepository.findProductById(productId);
            if (!product) throw new Error('Product not found');

            const subtotal = product.price * quantity;

            if (!cart) {
                const newCart = {
                    userId,
                    products: [{ productId, quantity, price: product.price, subtotal }],
                    total: subtotal,
                };
                return await cartRepository.createCart(newCart);
            } else {
                const existingProduct = cart.products.find(p => p.productId.toString() === productId);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                    existingProduct.subtotal = existingProduct.price * existingProduct.quantity;
                } else {
                    cart.products.push({ productId, quantity, price: product.price, subtotal });
                }

                cart.total = cart.products.reduce((acc, prod) => acc + prod.subtotal, 0);
                return await cartRepository.updateCart(cart);
            }
        } catch (error) {
            throw new Error(`Error adding to cart: ${error.message}`);
        }
    }

    async getCartByUserId(userId) {
        try {
            const cart = await cartRepository.findCartByUserId(userId);
            if (!cart) throw new Error('Cart not found');
            return cart;
        } catch (error) {
            throw new Error(`Error retrieving cart: ${error.message}`);
        }
    }

    async deleteCart(cartId) {
        try {
            return await cartRepository.deleteCart(cartId);  // Borrado lógico
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }
}

