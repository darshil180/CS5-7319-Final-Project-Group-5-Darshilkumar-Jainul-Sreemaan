const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cartRoutes = require("./routes/cartRoutes");
const responseFormatter = require("./middleware/responseFormatter");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(responseFormatter); // Apply response formatter

// Routes
app.use("/api/cart", cartRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Cart Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Cart Service running on port ${PORT}`);
});
