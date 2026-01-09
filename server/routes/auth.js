const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check user exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await user.save();

        // Create token
        const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role: savedUser.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1d' }
        );

        res.header('auth-token', token).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('LOGIN ERROR:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
