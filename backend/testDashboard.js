const jwt = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const testDashboardFetch = async () => {
    try {
        const token = jwt.sign({ id: 1, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const res = await axios.get('http://localhost:5000/api/analytics/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('Fetch Error:', err.response ? err.response.status : err.message);
        console.error('Error Details:', err.response ? err.response.data : '');
    }
    process.exit(0);
};

testDashboardFetch();
