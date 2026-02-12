const pool = require('../config/db');

class Customer {
    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM customers');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(customer) {
        const { name, email, region } = customer;
        const [result] = await pool.execute(
            'INSERT INTO customers (name, email, region) VALUES (?, ?, ?)',
            [name, email, region]
        );
        return result.insertId;
    }
}

module.exports = Customer;
