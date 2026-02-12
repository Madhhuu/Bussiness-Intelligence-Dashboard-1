const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const verifyUser = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'bi_dashboard',
        });

        const [rows] = await pool.execute('SELECT email, role FROM users WHERE email = ?', ['admin@gmail.com']);
        if (rows.length > 0) {
            console.log('Admin user verified:', rows[0]);
        } else {
            console.log('Admin user NOT found');
        }
        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verifyUser();
