const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../backend/.env' });

async function resetPasswords() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345',
        database: process.env.DB_NAME || 'bi_dashboard',
    });

    try {
        const password = '123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update all users to have password '123' for easy recovery
        await connection.execute('UPDATE users SET password_hash = ?', [hashedPassword]);
        console.log('All user passwords reset to 123');

    } catch (err) {
        console.error('Error resetting passwords:', err.message);
    } finally {
        await connection.end();
    }
}

resetPasswords();
