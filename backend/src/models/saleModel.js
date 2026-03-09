const pool = require('../config/db');

class Sale {
    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM sales ORDER BY sale_date DESC, created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM sales WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { product_name, category, quantity, price, sale_date, customer_id } = data;
        const [result] = await pool.execute(
            'INSERT INTO sales (product_name, category, quantity, price, sale_date, customer_id) VALUES (?, ?, ?, ?, ?, ?)',
            [product_name, category, quantity, price, sale_date, customer_id || null]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { product_name, category, quantity, price, sale_date, customer_id } = data;
        const [result] = await pool.execute(
            'UPDATE sales SET product_name = ?, category = ?, quantity = ?, price = ?, sale_date = ?, customer_id = ? WHERE id = ?',
            [product_name, category, quantity, price, sale_date, customer_id || null, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM sales WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Sale;
