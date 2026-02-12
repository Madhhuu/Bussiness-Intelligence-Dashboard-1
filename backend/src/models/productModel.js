const pool = require('../config/db');

class Product {
    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM products');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(product) {
        const { name, category, price, stock_level } = product;
        const [result] = await pool.execute(
            'INSERT INTO products (name, category, price, stock_level) VALUES (?, ?, ?, ?)',
            [name, category, price, stock_level]
        );
        return result.insertId;
    }

    static async updateStock(id, newStock) {
        await pool.execute('UPDATE products SET stock_level = ? WHERE id = ?', [newStock, id]);
    }
}

module.exports = Product;
