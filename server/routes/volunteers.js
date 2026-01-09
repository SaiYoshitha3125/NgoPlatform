const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// @route   GET /api/volunteers
// @desc    Get all volunteer applications
router.get('/', async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/volunteers
// @desc    Submit a new volunteer application and register user
router.post('/', async (req, res) => {
    const { name, email, phone, skills, availability, message, password } = req.body;
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
            name,
            email,
            password: hashedPassword,
            role: 'Volunteer'
        });
        await newUser.save();

        // Create volunteer profile
        const newVolunteer = new Volunteer({
            userId: newUser._id,
            name,
            email,
            phone,
            skills: skills ? skills.split(',').map(s => s.trim()) : [],
            availability,
            message,
            status: 'Approved'
        });
        const savedVolunteer = await newVolunteer.save();

        // Seed initial tasks for the new volunteer
        const seedTasks = [
            {
                title: 'Conduct Skills Training Session',
                desc: 'Lead a 2-hour training session on digital literacy for women',
                date: '2024-01-20',
                location: 'Community Center, Mumbai',
                duration: '3h',
                status: 'pending',
                priority: 'high',
                volunteerId: newUser._id
            },
            {
                title: 'Distribute Educational Materials',
                desc: 'Help distribute learning materials to beneficiaries',
                date: '2024-01-22',
                location: 'NGO Office',
                duration: '2h',
                status: 'in-progress',
                priority: 'medium',
                volunteerId: newUser._id
            },
            {
                title: 'Impact Story Writing',
                desc: 'Write a short impact story about a beneficiary you recently interacted with',
                date: '2024-01-10',
                location: 'Remote',
                duration: '2h',
                status: 'completed',
                priority: 'low',
                volunteerId: newUser._id
            }
        ];
        await Task.insertMany(seedTasks);

        res.status(201).json({
            message: 'Registration successful!',
            volunteer: savedVolunteer
        });
    } catch (err) {
        console.error('Registration error detail:', {
            message: err.message,
            stack: err.stack,
            body: req.body
        });
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/volunteers/:id/status
// @desc    Update volunteer application status
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const volunteer = await Volunteer.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/volunteers/me
// @desc    Get current volunteer profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const volunteer = await Volunteer.findOne({ email: user.email });
        if (!volunteer) return res.status(404).json({ message: 'Profile not found' });
        res.json({ ...volunteer._doc, name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/volunteers/me
// @desc    Update current volunteer profile
router.put('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, phone, skills, availability, message, bio } = req.body;

        // Update User name if changed
        if (name) {
            user.name = name;
            await user.save();
        }

        const volunteer = await Volunteer.findOneAndUpdate(
            { email: user.email },
            {
                name: name || user.name,
                phone,
                skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
                availability,
                message,
                bio
            },
            { new: true, upsert: true }
        );

        res.json({ ...volunteer._doc, name: user.name });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   GET /api/volunteers/tasks
// @desc    Get tasks for current volunteer
router.get('/tasks', auth, async (req, res) => {
    try {
        let tasks = await Task.find({ volunteerId: req.user._id }).sort({ date: 1 });

        // If no tasks found, return a default set
        if (tasks.length === 0) {
            const seedTasks = [
                {
                    title: 'Conduct Skills Training Session',
                    desc: 'Lead a 2-hour training session on digital literacy for women',
                    date: '2024-01-20',
                    location: 'Community Center, Mumbai',
                    duration: '3h',
                    status: 'pending',
                    priority: 'high',
                    volunteerId: req.user._id
                },
                {
                    title: 'Distribute Educational Materials',
                    desc: 'Help distribute learning materials to beneficiaries',
                    date: '2024-01-22',
                    location: 'NGO Office',
                    duration: '2h',
                    status: 'in-progress',
                    priority: 'medium',
                    volunteerId: req.user._id
                },
                {
                    title: 'Impact Story Writing',
                    desc: 'Write a short impact story about a beneficiary you recently interacted with',
                    date: '2024-01-10',
                    location: 'Remote',
                    duration: '2h',
                    status: 'completed',
                    priority: 'low',
                    volunteerId: req.user._id
                }
            ];
            tasks = await Task.insertMany(seedTasks);
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/volunteers/tasks/:id
// @desc    Update task status
router.put('/tasks/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, volunteerId: req.user._id },
            { status },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

