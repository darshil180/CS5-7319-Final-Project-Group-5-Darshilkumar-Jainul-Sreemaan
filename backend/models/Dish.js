const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['South Indian', 'Chinese', 'Mexican', 'Italian'] },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String }, // URL to an image of the dish
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Dish', dishSchema);
