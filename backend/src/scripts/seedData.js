const pool = require('../config/db');

const seedData = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Seeding sample data...');

        // Seed Customers
        const customers = [
            ['Alice Johnson', 'alice@example.com', '9876543210', '123 Main St, New York'],
            ['Bob Smith', 'bob@example.com', '9876543211', '456 Oak Ave, Los Angeles'],
            ['Charlie Brown', 'charlie@example.com', '9876543212', '789 Pine Rd, Chicago'],
            ['Diana Prince', 'diana@example.com', '9876543213', '101 Maple Dr, Houston'],
            ['Edward Norton', 'edward@example.com', '9876543214', '202 Birch Ln, Phoenix']
        ];

        for (const customer of customers) {
            await connection.execute(
                'INSERT IGNORE INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
                customer
            );
        }

        // Seed Sales
        const sales = [
            ['Laptop Pro 15"', 'Electronics', 5, 120000.00, '2026-03-01'],
            ['Wireless Mouse', 'Accessories', 50, 1500.00, '2026-03-02'],
            ['Mechanical Keyboard', 'Accessories', 20, 4500.00, '2026-03-03'],
            ['27" 4K Monitor', 'Electronics', 10, 35000.00, '2026-03-04'],
            ['USB-C Hub', 'Accessories', 30, 2500.00, '2026-03-05'],
            ['iPhone 15 Case', 'Mobile', 100, 999.00, '2026-03-06'],
            ['Gaming Chair', 'Furniture', 5, 15000.00, '2026-03-07'],
            ['Standing Desk', 'Furniture', 3, 25000.00, '2026-03-08']
        ];

        for (const sale of sales) {
            await connection.execute(
                'INSERT INTO sales (product_name, category, quantity, price, sale_date) VALUES (?, ?, ?, ?, ?)',
                sale
            );
        }

        console.log('Sample data seeded successfully');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
