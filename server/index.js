const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const volunteerRoutes = require('./routes/volunteers');
const donationRoutes = require('./routes/donations');
const userRoutes = require('./routes/users');
const beneficiaryRoutes = require('./routes/beneficiaries');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ngo_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);

app.get('/', (req, res) => {
    res.send('NGO Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
