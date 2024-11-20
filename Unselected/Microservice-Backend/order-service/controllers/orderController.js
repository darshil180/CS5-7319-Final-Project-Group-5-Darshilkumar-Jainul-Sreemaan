const Order = require("../models/Order");


// Mock static cart data
const staticCartData = {
  user: "673ca29c30a9e28254ac472b",
  items: [
    {
      dish: {
        _id: "673ca29c30a9e28254ac472c",
        name: "Pizza Margherita",
        price: 12.99,
      },
      quantity: 2,
    },
    {
      dish: {
        _id: "673ca29c30a9e28254ac472d",
        name: "Spaghetti Carbonara",
        price: 15.99,
      },
      quantity: 1,
    },
  ],
};

// Create order from static cart data
exports.createOrder = async (req, res) => {
  const { orderType } = req.body; // 'Dine-In' or 'Pickup'

  try {
    const userId = req.user;

    // Use static cart data instead of querying the database
    const cart = staticCartData;

    if (!cart || cart.items.length === 0 || cart.user !== userId) {
      return res.status(400).json({ msg: "Cart is empty or invalid" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );

    await order.save();

    // Clear static cart data for testing purposes (optional, simulated)
    staticCartData.items = [];

    res.status(201).json({ msg: "Order created successfully", data: order });
  } catch (error) {
    console.error("Error creating order:", error.message);
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
    console.error("Error updating order status:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all orders (for admin or user)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate("items.dish");

    res.status(200).json({ msg: "Orders retrieved", data: orders });
  } catch (error) {
    console.error("Error retrieving orders:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
