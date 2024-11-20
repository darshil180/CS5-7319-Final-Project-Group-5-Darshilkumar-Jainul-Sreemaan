const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menuRoutes");
const ResponseFormatter = require("./middleware/responseFormatter");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());
app.use(ResponseFormatter)

// Routes
app.use("/api/menu", menuRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Menu Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Menu Service running on port ${PORT}`);
});
