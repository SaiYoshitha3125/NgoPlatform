const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const User = require('../models/User');
const Donor = require('../models/Donor');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// @route   GET /api/donations
// @desc    Get all donation records
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/donations
// @desc    Record a new donation
router.post('/', async (req, res) => {
    const { donorName, email, amount, paymentMethod, transactionId } = req.body;
    try {
        const newDonation = new Donation({
            donorName,
            email,
            amount,
            paymentMethod,
            transactionId
        });
        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   POST /api/donations/register
// @desc    Register a new donor and record initial donation
router.post('/register', async (req, res) => {
    const { donorName, email, password, phone, address, amount } = req.body;
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            name: donorName,
            email,
            password: hashedPassword,
            role: 'Donor'
        });
        await newUser.save();

        // Create donor profile
        const newDonor = new Donor({
            userId: newUser._id,
            name: donorName,
            email,
            phone,
            address,
            totalDonated: amount || 0
        });
        await newDonor.save();

        // Record donation if amount provided
        if (amount > 0) {
            const newDonation = new Donation({
                donorName,
                email,
                amount,
                paymentMethod: 'Online',
                transactionId: `TXN${Date.now()}`,
                status: 'Completed'
            });
            await newDonation.save();
        }

        res.status(201).json({
            message: 'Donor registration successful!',
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        console.error('Donor registration error:', err);
        res.status(400).json({ message: err.message });
    }
});

// @route   GET /api/donations/me/dashboard
// @desc    Get donor dashboard data
router.get('/me/dashboard', auth, async (req, res) => {
    try {
        const donor = await Donor.findOne({ userId: req.user._id });
        if (!donor) return res.status(404).json({ message: 'Donor profile not found' });

        const history = await Donation.find({ email: donor.email }).sort({ date: -1 });
        const totalAmount = history.reduce((sum, d) => sum + d.amount, 0);

        // organization works (static for now but can be dynamic)
        const organizationWorks = [
            { id: 1, title: 'Project Vidya', impact: 'Supporting education for 50 girls' },
            { id: 2, title: 'Swasthya Initiative', impact: 'Providing healthcare to 3 rural clusters' },
            { id: 3, title: 'Skill Development Center', impact: 'Training 20 women in tailoring' }
        ];

        res.json({
            profile: donor,
            totalDonated: totalAmount,
            donationHistory: history,
            supportedWorks: organizationWorks
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
