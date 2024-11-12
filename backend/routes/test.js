// routes/protectedRoute.js
const express = require('express');
const router = express.Router();

// Protected route example
router.get('/', (req, res) => {
    res.json({ message: 'This is a protected rout!!!!!', userId: req.user });
});

module.exports = router;
