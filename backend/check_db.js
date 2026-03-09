const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function checkDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345',
        database: process.env.DB_NAME || 'bi_dashboard',
    });

    try {
        console.log('\n--- SALES COLUMNS ---');
        const [salesCols] = await connection.execute('DESCRIBE sales');
        salesCols.forEach(col => console.log(`${col.Field}: ${col.Type}`));

        console.log('\n--- SAMPLE SALES DATA ---');
        const [sales] = await connection.execute('SELECT * FROM sales LIMIT 3');
        console.log(JSON.stringify(sales, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

checkDb();
