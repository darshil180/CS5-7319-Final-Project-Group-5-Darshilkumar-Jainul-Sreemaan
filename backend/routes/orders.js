const express = require("express");
const authMiddleware = require("../middleware/auth");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Create order from cart
router.post("/", authMiddleware, orderController.createOrder);

// Update order status
router.patch(
  "/update-status/:orderId",
  authMiddleware,
  orderController.updateOrderStatus
);

// Get all orders
router.get("/", authMiddleware, orderController.getAllOrders);

module.exports = router;
