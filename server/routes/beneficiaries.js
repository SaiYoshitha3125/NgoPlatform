const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

// @route   GET /api/beneficiaries
// @desc    Get all beneficiaries
router.get('/', async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
        res.json(beneficiaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/beneficiaries
// @desc    Create a new beneficiary
router.post('/', async (req, res) => {
    const { name, email, phone, address, assistanceType, description, age, familySize } = req.body;
    try {
        const newBeneficiary = new Beneficiary({
            name,
            email,
            phone,
            address,
            assistanceType,
            description,
            age,
            familySize
        });
        const savedBeneficiary = await newBeneficiary.save();
        res.status(201).json(savedBeneficiary);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/beneficiaries/:id
// @desc    Update beneficiary status
router.put('/:id', async (req, res) => {
    try {
        const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedBeneficiary);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
