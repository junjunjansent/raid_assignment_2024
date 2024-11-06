import mongoose from "mongoose";

const product_Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    stockQty: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const product = mongoose.model("product", product_Schema);
export default product;