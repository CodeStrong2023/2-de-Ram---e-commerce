import { request, response } from "express";

import CartService from "../services/cart.service.js";

export default class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  addToCart = async (req = request, res = response, next) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      const cart = await this.cartService.addToCart(userId, productId, quantity);

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  };

  increaseProductQuantity = async (req = request, res = response, next) => {
    try {
      const { productId, adjustment } = req.body;
      const userId = req.user.id;

      const updatedCart = await this.cartService.updateProductQuantity(userId, productId, adjustment);

      res.status(200).json({
        message: "Product quantity increased successfully",
        cart: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  };

  // Método para disminuir la cantidad de productos
  decreaseProductQuantity = async (req = request, res = response, next) => {
    try {
      const {  productId, adjustment } = req.body;
      const userId = req.user.id;

      const updatedCart = await this.cartService.decreaseProductQuantity(userId, productId, adjustment);

      res.status(200).json({
        message: "Product quantity decreased successfully",
        cart: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  };


  getCartByUserId = async (req = request, res = response, next) => {
    try {
      const cart = await this.cartService.getCartByUserId(req.user.id);
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      res.json(cart);
    } catch (error) {
      next(error);
    }
  };

  deleteCart = async (req = request, res = response, next) => {
    try {
      const cart = await this.cartService.deleteCart(req.params.cartId);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.json({ message: "Cart deleted logically", cart });
    } catch (error) {
      next(error);
    }
  };
}
