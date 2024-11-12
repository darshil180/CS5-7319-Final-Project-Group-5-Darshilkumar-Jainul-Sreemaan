// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash password before saving user to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Don't hash if password is not modified
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
});

// Compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
