const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/test', () => {
    return hello;
})

// Define Routes
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
