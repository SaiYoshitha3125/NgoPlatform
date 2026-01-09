const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Volunteer = require('./models/Volunteer');
const Donation = require('./models/Donation');

dotenv.config();

const testVolunteers = [
    {
        name: "Anjali Sharma",
        email: "anjali@example.com",
        phone: "9876543210",
        skills: ["Education", "Communication"],
        availability: "Weekends",
        message: "I would love to help in teaching girls.",
        status: "Pending"
    },
    {
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "9876543211",
        skills: ["Tailoring", "Empowerment"],
        availability: "Weekdays",
        message: "I am a professional tailor and want to train others.",
        status: "Approved"
    },
    {
        name: "Sneha Reddy",
        email: "sneha@example.com",
        phone: "9876543212",
        skills: ["Healthcare", "Awareness"],
        availability: "Flexible",
        message: "Can help with medical camps.",
        status: "Approved"
    }
];

const testDonations = [
    {
        donorName: "Amit Kumar",
        email: "amit@example.com",
        amount: 5000,
        paymentMethod: "UPI",
        transactionId: "TXN1001",
        status: "Completed"
    },
    {
        donorName: "Sunil Verma",
        email: "sunil@example.com",
        amount: 2500,
        paymentMethod: "Card",
        transactionId: "TXN1002",
        status: "Completed"
    },
    {
        donorName: "Meera Das",
        email: "meera@example.com",
        amount: 10000,
        paymentMethod: "UPI",
        transactionId: "TXN1003",
        status: "Completed"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ngo_db');
        console.log('Connected to MongoDB');

        // Clear existing test data
        await Volunteer.deleteMany({});
        await Donation.deleteMany({});
        console.log('Cleared existing Volunteer and Donation data');

        // Insert new data
        await Volunteer.insertMany(testVolunteers);
        await Donation.insertMany(testDonations);
        console.log('Seeded Volunteers and Donations successfully');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
