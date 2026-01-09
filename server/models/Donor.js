const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    totalDonated: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);
