const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

async function createUser() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345',
        database: process.env.DB_NAME || 'bi_dashboard',
    });

    try {
        const username = 'Madhu';
        const email = 'madhu@gmail.com';
        const password = '123';
        const role = 'Admin';

        // Check if exists
        const [existing] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            console.log('User already exists');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await connection.execute(
            'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role]
        );
        console.log('User created: madhu@gmail.com / 123');

    } catch (err) {
        console.error('Error creating user:', err.message);
    } finally {
        await connection.end();
    }
}

createUser();
