const mongoose = require('mongoose');

const BeneficiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    assistanceType: {
        type: String,
        required: true,
        enum: ['Education', 'Healthcare', 'Financial', 'Food & Nutrition', 'Shelter', 'Other']
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Pending', 'Completed', 'Inactive']
    },
    description: {
        type: String,
        default: ''
    },
    age: {
        type: Number
    },
    familySize: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Beneficiary', BeneficiarySchema);
