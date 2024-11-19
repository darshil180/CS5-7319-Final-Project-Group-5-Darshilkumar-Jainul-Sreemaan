const Dish = require("../models/Dish");
const mongoose = require("mongoose");

// Add one or multiple dishes (only for authorized users, e.g., admins)
exports.addDishes = async (req, res) => {
  try {
    const { dishes } = req.body;
    let addedDishes = [];

    if (Array.isArray(dishes)) {
      // Handle multiple dishes
      addedDishes = await Dish.insertMany(dishes);
    } else {
      // Handle single dish
      const { name, category, description, price, imageUrl } = req.body;

      if (!name || !category || !price) {
        return res.status(400).json({
          msg: "Name, category, and price are required",
        });
      }

      const newDish = new Dish({
        name,
        category,
        description,
        price,
        imageUrl,
      });

      await newDish.save();
      addedDishes.push(newDish);
    }

    res.status(201).json({
      msg: "Dishes added successfully",
      data: addedDishes,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all dishes with optional pagination and filtering
exports.getAllDishes = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;

    const dishes = await Dish.find(query)
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt);

    const totalCount = await Dish.countDocuments(query);

    res.status(200).json({
      msg: "Dishes retrieved successfully",
      totalCount,
      currentPage: pageInt,
      totalPages: Math.ceil(totalCount / limitInt),
      data: dishes,
    });
  } catch (error) {
    console.error("Error retrieving dishes:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get a single dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dishId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(400).json({ msg: "Invalid dish ID format" });
    }

    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    res.status(200).json({
      msg: "Dish retrieved successfully",
      data: dish,
    });
  } catch (error) {
    console.error("Error retrieving dish:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
