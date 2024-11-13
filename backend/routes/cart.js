const express = require('express');
const Cart = require('../models/Cart');
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });
    return cart;
};

// Add dish to cart
router.post('/add', authMiddleware, async (req, res) => {
    const { dishId, quantity = 1 } = req.body;
    const userId = req.user;

    try {
        const cart = await getCart(userId);
        const itemIndex = cart.items.findIndex(item => item.dish.toString() === dishId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ dish: dishId, quantity });
        }

        await cart.save();
        res.status(200).json({ msg: 'Dish added to cart', data: cart });
    } catch (error) {
        console.error("Error adding dish to cart:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user }).populate('items.dish');
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        res.status(200).json({ msg: 'Cart retrieved', data: cart });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update cart item quantity
router.patch('/update', authMiddleware, async (req, res) => {
    const { dishId, quantity } = req.body;
    const userId = req.user;

    if (quantity < 0) {
        return res.status(400).json({ msg: 'Quantity cannot be negative' });
    }

    try {
        const cart = await getCart(userId);
        const itemIndex = cart.items.findIndex(item => item.dish.toString() === dishId);

        if (itemIndex > -1) {
            quantity === 0 ? cart.items.splice(itemIndex, 1) : cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ msg: 'Cart item updated', data: cart });
        } else {
            res.status(404).json({ msg: 'Dish not found in cart' });
        }
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Remove item from cart
router.delete('/remove', authMiddleware, async (req, res) => {
    const { dishId } = req.body;
    const userId = req.user;

    try {
        const cart = await getCart(userId);
        const itemIndex = cart.items.findIndex(item => item.dish.toString() === dishId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.status(200).json({ msg: 'Item removed from cart', data: cart });
        } else {
            res.status(404).json({ msg: 'Dish not found in cart' });
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Clear entire cart
router.delete('/clear', authMiddleware, async (req, res) => {
    const userId = req.user;

    try {
        const cart = await getCart(userId);
        cart.items = [];
        await cart.save();

        res.status(200).json({ msg: 'Cart cleared', data: cart });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
