const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
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
    skills: [{
        type: String,
        trim: true
    }],
    availability: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected']
    }
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', VolunteerSchema);
