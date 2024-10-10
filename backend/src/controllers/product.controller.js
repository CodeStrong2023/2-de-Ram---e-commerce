import { request, response } from "express";
import ProductService from "../services/product.service.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req = request, res = response, next) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error); // Delegamos el manejo de errores al middleware
    }
  };

  getAllProducts = async (req = request, res = response, next) => {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req = request, res = response, next) => {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req = request, res = response, next) => {
    try {
      const product = await this.productService.deleteProduct(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted logically", product });
    } catch (error) {
      next(error);
    }
  };
}
