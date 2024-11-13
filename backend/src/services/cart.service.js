export default class CartService {
  async validateToken(token) {
    if (!token) throw new UnauthorizedException("Token not provided");

    const isValid = await authService.validateToken(token);
    if (!isValid) throw new UnauthorizedException("Invalid or expired token");
  }

  async decreaseProductQuantity(userId, productId, adjustment, token) {
    await this.validateToken(token);

    const cart = await cartRepository.findCartByUserId(userId);
    if (!cart) throw new NotFoundException("Cart not found");

    const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
    if (!existingProduct) throw new NotFoundException("Product not found in cart");

    existingProduct.quantity -= adjustment;

    if (existingProduct.quantity <= 0) {
      cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
    } else {
      existingProduct.subtotal = existingProduct.price * existingProduct.quantity;
    }

    cart.total = cart.products.reduce((acc, prod) => acc + prod.subtotal, 0);

    if (cart.products.length === 0) {
      await cartRepository.deleteCart(cart.id);
      return { message: "Cart is now empty and has been deleted" };
    }

    return await cartRepository.updateCart(cart);
  }

  // Otros métodos optimizados
}
