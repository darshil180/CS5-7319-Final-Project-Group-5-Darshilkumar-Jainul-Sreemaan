const express = require("express");
const authMiddleware = require("../middleware/auth");
const cartController = require("../controllers/cartController");
const router = express.Router();

// Add dish to cart
router.post("/add", authMiddleware, cartController.addDishToCart);

// Get cart
router.get("/", authMiddleware, cartController.getCart);

// Update cart item quantity
router.patch("/update", authMiddleware, cartController.updateCartItem);

// Remove item from cart
router.post("/remove", authMiddleware, cartController.removeCartItem);

// Clear entire cart
router.post("/clear", authMiddleware, cartController.clearCart);

module.exports = router;
