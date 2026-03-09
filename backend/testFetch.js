const jwt = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const testAuthFetch = async () => {
    try {
        // Mock a token for the admin user (id 1 usually)
        const token = jwt.sign({ id: 1, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Using Token:', token);

        const res = await axios.get('http://localhost:5000/api/sales', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response Status:', res.status);
        console.log('Response Data Count:', res.data.length);
        console.log('First Item:', res.data[0]);
    } catch (err) {
        console.error('Fetch Error:', err.response ? err.response.status : err.message);
        console.error('Error Details:', err.response ? err.response.data : '');
    }
    process.exit(0);
};

testAuthFetch();
