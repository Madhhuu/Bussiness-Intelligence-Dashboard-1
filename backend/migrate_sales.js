const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345',
        database: process.env.DB_NAME || 'bi_dashboard',
    });

    try {
        console.log('Adding customer_id to sales table...');
        await connection.execute('ALTER TABLE sales ADD COLUMN customer_id INT DEFAULT NULL');
        await connection.execute('ALTER TABLE sales ADD CONSTRAINT fk_sales_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL');

        // Link existing sales to a default customer (e.g., the first one) to show some data for testing if possible
        const [customers] = await connection.execute('SELECT id FROM customers LIMIT 1');
        if (customers.length > 0) {
            const defaultCustomerId = customers[0].id;
            console.log(`Linking existing sales to customer ID: ${defaultCustomerId}`);
            await connection.execute('UPDATE sales SET customer_id = ? WHERE customer_id IS NULL', [defaultCustomerId]);
        }

        console.log('Migration successful!');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await connection.end();
    }
}

migrate();
