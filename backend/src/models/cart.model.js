import mongoose from "mongoose";

export const cartCollectionName = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollectionName, cartSchema);