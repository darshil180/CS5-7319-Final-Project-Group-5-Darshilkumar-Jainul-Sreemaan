// models/Cart.js
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [CartItemSchema],
});

module.exports = mongoose.model('Cart', CartSchema);
