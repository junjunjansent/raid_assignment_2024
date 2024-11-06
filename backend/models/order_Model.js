import mongoose from "mongoose";

// Cart Item Schema
const cartItem_Schema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' },
  cart_qty: { type: Number, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true }
});

// Order Schema
const order_Schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  time: { type: Date, default: Date.now },
  total_price: { type: Number, required: true },
  cartItems: [cartItem_Schema] // Array of cart items
});


const Order = mongoose.model('Order', order_Schema);

export default Order;