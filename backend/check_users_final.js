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
        const [users] = await connection.execute('SELECT id, username, email FROM users');
        users.forEach(u => {
            console.log(`USER_ID: ${u.id} | USERNAME: ${u.username} | EMAIL: ${u.email}`);
        });

    } catch (err) {
        console.error('Error checking users:', err.message);
    } finally {
        await connection.end();
    }
}

checkUsers();
