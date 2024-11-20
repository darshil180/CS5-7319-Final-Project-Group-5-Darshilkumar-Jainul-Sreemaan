const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, cartController.addDishToCart);
router.get("/", authMiddleware, cartController.getCart);

module.exports = router;
