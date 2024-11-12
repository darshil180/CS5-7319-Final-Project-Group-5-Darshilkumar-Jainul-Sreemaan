// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth'); // Import authentication routes
const authMiddleware = require('./middleware/auth');
const responseFormatter = require('./middleware/responseFormatter');
const test = require('./routes/test');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data

// Connect to MongoDB
connectDB();

app.use(responseFormatter); // Apply response formatter middleware globally

// Use authentication routes
app.use('/api/auth', authRoutes); // Route for authentication-related endpoints
app.use('/api/protected', authMiddleware, test);

// Example route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
