import mongoose from "mongoose";
import { Schema } from "mongoose";
import Product from "./product.model.js"; // Suponiendo que los productos están referenciados

export const cartCollectionName = "carts";

const cartProductSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1."],
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Si tienes un modelo de usuario
    },
    products: {
      type: [cartProductSchema], // Lista de productos con cantidad
      default: [],
    },
    isDeleted: { type: Boolean, default: false }, // Borrado lógico del carrito
  },
  { timestamps: true }
);

const cartModel = mongoose.model(cartCollectionName, cartSchema);
export default cartModel;
