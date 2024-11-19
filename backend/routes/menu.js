const express = require("express");
const authMiddleware = require("../middleware/auth");
const dishController = require("../controllers/dishController");
const router = express.Router();

// Add one or multiple dishes (only for authorized users, e.g., admins)
router.post("/dishes", authMiddleware, dishController.addDishes);

// Get all dishes with optional pagination and filtering
router.get("/dishes", dishController.getAllDishes);

// Get a single dish by ID
router.get("/dishes/:id", dishController.getDishById);

module.exports = router;
