const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user', // 'Member', 'Volunteer', 'Donor', 'Beneficiary', 'Admin', 'user'
        enum: ['Member', 'Volunteer', 'Donor', 'Beneficiary', 'Admin', 'user']
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
