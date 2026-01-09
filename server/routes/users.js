const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users
// @desc    Get all users or filter by role
router.get('/', async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};

        if (role) {
            query.role = role;
        }

        const users = await User.find(query)
            .select('-password') // Exclude password from response
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
