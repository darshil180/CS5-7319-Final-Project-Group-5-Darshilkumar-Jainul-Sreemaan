const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const reservationRoutes = require("./routes/reservationRoutes");
const responseFormatter = require("./middleware/responseFormatter");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5006;

// Middleware
app.use(cors());
app.use(express.json());
app.use(responseFormatter);

// Routes
app.use("/api/reservations", reservationRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Reservation Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Reservation Service running on port ${PORT}`);
});
