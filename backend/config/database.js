// config/database.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB
async function connectDB() {
    try {
        // Connecting to MongoDB using the URI stored in the .env file
        await mongoose.connect(process.env.MONGODB_URI);  // No additional options needed
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

module.exports = connectDB;
