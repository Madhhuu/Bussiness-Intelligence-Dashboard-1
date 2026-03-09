const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function checkUsers() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345',
        database: process.env.DB_NAME || 'bi_dashboard',
    });

    try {
        console.log('\n--- USERS DATA ---');
        const [users] = await connection.execute('SELECT id, username, email FROM users');
        console.log(JSON.stringify(users, null, 2));

    } catch (err) {
        console.error('Error checking users:', err.message);
    } finally {
        await connection.end();
    }
}

checkUsers();
