const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: {
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
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: 'Online'
    },
    transactionId: {
        type: String
    },
    status: {
        type: String,
        default: 'Completed',
        enum: ['Pending', 'Completed', 'Failed']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);
