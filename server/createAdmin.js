// Quick script to create a test admin user
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ngo_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// User Schema (inline for this script)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: 'user',
        enum: ['Member', 'Volunteer', 'Donor', 'Beneficiary', 'Admin', 'user']
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Create admin user
async function createAdminUser() {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@test.com' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Create admin
        const admin = new User({
            name: 'Admin User',
            email: 'admin@test.com',
            password: hashedPassword,
            role: 'Admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@test.com');
        console.log('Password: admin123');
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin user:', err);
        process.exit(1);
    }
}

createAdminUser();
