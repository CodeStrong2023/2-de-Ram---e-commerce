import Cart from '../models/cart.model.js'; // Importación en estilo ES6

class CartRepository {
    async createCart(cartData) {
        const cart = new Cart(cartData);
        return await cart.save();
    }

    async findCartByUserId(userId) {
        return await Cart.findOne({ userId, isDeleted: false }).populate('products.productId');
    }

    async updateCart(cart) {
        return await cart.save();
    }

    async deleteCart(cartId) {
        // Borrado lógico
        return await Cart.findByIdAndUpdate(cartId, { isDeleted: true }, { new: true });
    }
}

const cartRepository = new CartRepository();
export default cartRepository;