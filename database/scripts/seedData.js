const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../backend/.env') });

const seedData = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bi_dashboard";
    const client = new MongoClient(uri);

    try {
        console.log(`Connecting to MongoDB at ${uri}...`);
        await client.connect();
        const db = client.db(); // Auto-selects db from URI if specified, or use client.db("bi_dashboard")

        console.log('Connected correctly to server. Clearing existing data...');

        // Seed Customers
        const customersCol = db.collection('customers');
        const customers = [
            { name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210', address: '123 Main St, New York', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Bob Smith', email: 'bob@example.com', phone: '9876543211', address: '456 Oak Ave, Los Angeles', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Charlie Brown', email: 'charlie@example.com', phone: '9876543212', address: '789 Pine Rd, Chicago', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Diana Prince', email: 'diana@example.com', phone: '9876543213', address: '101 Maple Dr, Houston', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Edward Norton', email: 'edward@example.com', phone: '9876543214', address: '202 Birch Ln, Phoenix', createdAt: new Date(), updatedAt: new Date() }
        ];

        for (const customer of customers) {
            await customersCol.updateOne({ email: customer.email }, { $set: customer }, { upsert: true });
        }
        console.log('Customers seeded.');

        // Seed Sales
        const salesCol = db.collection('sales');
        await salesCol.deleteMany({});
        const sales = [
            { product_name: 'Laptop Pro 15"', category: 'Electronics', quantity: 5, price: 120000.00, sale_date: new Date('2026-03-01'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: 'Wireless Mouse', category: 'Accessories', quantity: 50, price: 1500.00, sale_date: new Date('2026-03-02'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: 'Mechanical Keyboard', category: 'Accessories', quantity: 20, price: 4500.00, sale_date: new Date('2026-03-03'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: '27" 4K Monitor', category: 'Electronics', quantity: 10, price: 35000.00, sale_date: new Date('2026-03-04'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: 'USB-C Hub', category: 'Accessories', quantity: 30, price: 2500.00, sale_date: new Date('2026-03-05'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: 'iPhone 15 Case', category: 'Mobile', quantity: 100, price: 999.00, sale_date: new Date('2026-03-06'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: 'Gaming Chair', category: 'Furniture', quantity: 5, price: 15000.00, sale_date: new Date('2026-03-07'), createdAt: new Date(), updatedAt: new Date() },
            { product_name: 'Standing Desk', category: 'Furniture', quantity: 3, price: 25000.00, sale_date: new Date('2026-03-08'), createdAt: new Date(), updatedAt: new Date() }
        ];
        await salesCol.insertMany(sales);
        console.log('Sales seeded.');

        console.log('Sample data seeded successfully via native driver!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
};

seedData();
