require("dotenv").config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await db();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});
