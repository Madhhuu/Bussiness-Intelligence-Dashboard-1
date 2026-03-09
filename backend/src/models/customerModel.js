const pool = require('../config/db');

class Customer {
    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM customers ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { name, email, phone, address } = data;
        const [result] = await pool.execute(
            'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
            [name, email, phone, address]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { name, email, phone, address } = data;
        const [result] = await pool.execute(
            'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
            [name, email, phone, address, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM customers WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Customer;
