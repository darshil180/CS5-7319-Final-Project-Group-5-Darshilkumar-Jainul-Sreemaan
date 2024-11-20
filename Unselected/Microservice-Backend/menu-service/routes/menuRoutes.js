const express = require("express");
const menuController = require("../controllers/menuController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add one or multiple dishes (only authorized users, e.g., admins)
router.post("/dishes", authMiddleware, menuController.addDishes);

// Get all dishes with optional filters
router.get("/dishes", menuController.getAllDishes);

// Get a single dish by ID
router.get("/dishes/:id", menuController.getDishById);

module.exports = router;
