const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Volunteer = require('./models/Volunteer');
const Donation = require('./models/Donation');

dotenv.config();

const showData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ngo_db');
        console.log('--- DATABASE TABLES CONTENT ---\n');

        const users = await User.find({}, { password: 0 });
        console.log('1. USERS TABLE:');
        console.log(JSON.stringify(users.map(u => ({
            id: u._id.toString(),
            name: u.name,
            email: u.email,
            role: u.role,
            createdAt: u.createdAt
        })), null, 2));

        const volunteers = await Volunteer.find();
        console.log('\n2. VOLUNTEERS TABLE:');
        console.log(JSON.stringify(volunteers.map(v => ({
            id: v._id.toString(),
            name: v.name,
            email: v.email,
            status: v.status,
            createdAt: v.createdAt
        })), null, 2));

        const donations = await Donation.find();
        console.log('\n3. DONATIONS TABLE:');
        console.log(JSON.stringify(donations.map(d => ({
            id: d._id.toString(),
            donor: d.donorName,
            amount: d.amount,
            status: d.status,
            date: d.date
        })), null, 2));

        process.exit(0);
    } catch (err) {
        console.error('Error fetching data:', err);
        process.exit(1);
    }
};

showData();
