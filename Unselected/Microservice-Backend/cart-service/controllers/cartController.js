const Cart = require("../models/Cart");
const axios = require("axios");

// Helper function to get or create a cart
const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });
  return cart;
};

// Add dish to cart
exports.addDishToCart = async (req, res) => {
  const { dishId, quantity = 1 } = req.body;
  const userId = req.user;

  try {
    const cart = await getCart(userId);
    const itemIndex = cart.items.findIndex(
      (item) => item.dish.toString() === dishId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ dish: dishId, quantity });
    }

    await cart.save();
    res.status(200).json({ msg: "Dish added to cart", data: cart });
  } catch (error) {
    console.error("Error adding dish to cart:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Helper to fetch dishes one by one
const fetchDishes = async (dishIds) => {
  try {
    // Fetch all dishes using /dishes/:id in parallel
    const dishPromises = dishIds.map((id) =>
      axios.get(`http://localhost:6001/api/menu/dishes/${id}`) // Call menu-service
    );
    const dishResponses = await Promise.all(dishPromises);

    // Map the responses to an array of dish objects
    return dishResponses.map((response) => response.data.data); // Assuming data is in response.data.data
  } catch (error) {
    console.error("Error fetching dishes from menu-service:", error.message);
    return []; // Return empty array on failure
  }
};

exports.getCart = async (req, res) => {
  try {
    // Fetch the user's cart
    const cart = await Cart.findOne({ user: req.user });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    // Get all dish IDs from the cart items
    const dishIds = cart.items.map((item) => item.dish);

    // Fetch dish details from menu-service
    const dishes = await fetchDishes(dishIds);

    // Map dish details back into the cart
    const cartWithDishes = cart.items.map((item) => ({
      ...item.toObject(),
      dish: dishes.find((dish) => dish._id === item.dish.toString()),
    }));

    res.status(200).json({ msg: "Cart retrieved", data: cartWithDishes });
  } catch (error) {
    console.error("Error retrieving cart:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


