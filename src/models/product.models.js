import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    bgcolor: {
      type: String,
    },
    panelColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
