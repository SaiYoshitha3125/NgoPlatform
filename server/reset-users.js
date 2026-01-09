const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const clearUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ngo_db');
        console.log('Connected to MongoDB');

        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users.`);

        process.exit(0);
    } catch (err) {
        console.error('Error clearing users:', err);
        process.exit(1);
    }
};

clearUsers();
