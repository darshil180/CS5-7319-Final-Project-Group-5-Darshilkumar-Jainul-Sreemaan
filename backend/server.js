const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const reservationRoutes = require("./routes/reservation");
const responseFormatter = require("./middleware/responseFormatter");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || !process.env.PORT) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Global response formatter middleware (for API responses)
app.use(responseFormatter);

// Route definitions
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);

// Health check route for sanity
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
