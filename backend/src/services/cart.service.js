import { ConflictException, NotFoundException } from "../exceptions/exceptions.js";

import { cartRepository } from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js";
import { sendMail } from "../utils/sendEmail.js";
import { ticketRepository } from "../repositories/ticket.repository.js";

export default class CartService {
  async addToCart(userId, productId, quantity) {
    const cart = await cartRepository.findCartByUserId(userId);
    const product = await productRepository.findProductById(productId);
    if (!product) throw new NotFoundException("Product not found");

    const subtotal = product.price * quantity;

    if (!cart) {
      const newCart = {
        userId,
        products: [{ productId, quantity, price: product.price, subtotal }],
        total: subtotal,
      };
      return await cartRepository.createCart(newCart);
    } else {
      const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.subtotal = existingProduct.price * existingProduct.quantity;
      } else {
        cart.products.push({ productId, quantity, price: product.price, subtotal, name: product.name });
      }

      cart.total = cart.products.reduce((acc, prod) => acc + prod.subtotal, 0);
      
      return await cartRepository.updateCart(cart);
    }
  }

  async getCartByUserId(userId) {
    const cart = await cartRepository.findCartByUserId(userId);
    if (!cart) throw new NotFoundException("Cart not found");
    return cart;
  }

  async deleteCart(cartId) {
    return await cartRepository.deleteCart(cartId); // Borrado lógico
  }

  async purchaseCart(user) {
    const cart = await cartRepository.findCartByUserId(user.id);
    if (!cart) throw new NotFoundException("Cart not found");
    // Sumamos el total de los productos del carrito
    const total = cart.products.reduce((acc, prod) => acc + prod.subtotal, 0);

    // Creamos el ticket de compra
    const ticket = {
      userId: user.id,
      userEmail: user.userEmail,
      code: Math.random().toString(36).substring(2).toUpperCase(),
      amount: total,
    };
    const newTicket = await ticketRepository.createTicket(ticket);
    if (!newTicket) throw new ConflictException("Error creating ticket");

    // Enviamos el ticket por correo electrónico
    await sendMail(
      user.userEmail,
      "Realizaste una compra",
      "Su código de compra",
      `<h2>Muchas gracias por su compra, su código de compra es ${newTicket.code}</h2>`
    );

    // Limpiamos el carrito
    await cartRepository.updateCart({ ...cart, products: [] });
    // Restamos el stock de los productos
    Promise.all(
      cart.products.map(async (prod) => {
        const product = await productRepository.findProductById(prod.productId);
        if (product) {
          product.stock -= prod.quantity;
          await productRepository.updateProduct(product);
        }
      })
    );

    return await cartRepository.updateCart(cart);
  }
}
