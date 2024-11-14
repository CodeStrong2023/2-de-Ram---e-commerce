import Product from "./product.model.js"; // Suponiendo que los productos están referenciados
import { Schema } from "mongoose";
import mongoose from "mongoose";

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
  price: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model(cartCollectionName, cartSchema);
export default cartModel;
