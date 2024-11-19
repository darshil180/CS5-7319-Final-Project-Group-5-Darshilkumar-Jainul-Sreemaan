const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create order from cart
exports.createOrder = async (req, res) => {
  const { orderType } = req.body; // 'Dine-In' or 'Pickup'

  try {
    const cart = await Cart.findOne({ user: req.user }).populate("items.dish");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user,
      items: cart.items.map((item) => ({
        dish: item.dish._id,
        quantity: item.quantity,
      })),
      totalAmount,
      orderType,
      status: "Received",
    });

    await order.save();

    // Clear the user's cart after creating the order
    cart.items = [];
    await cart.save();

    res.status(201).json({ msg: "Order created successfully", data: order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // Validate status
  if (!["Received", "Cooking", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ msg: "Order status updated", data: order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all orders (for admin or user)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate("items.dish");

    res.status(200).json({ msg: "Orders retrieved", data: orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
