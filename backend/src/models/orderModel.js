const pool = require('../config/db');

class Order {
    static async findAll() {
        const [rows] = await pool.execute(
            `SELECT o.*, c.name as customer_name 
       FROM orders o 
       JOIN customers c ON o.customer_id = c.id 
       ORDER BY o.created_at DESC`
        );
        return rows;
    }

    static async create(orderData) {
        const { customer_id, total_amount, status, items } = orderData;
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [orderResult] = await connection.execute(
                'INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)',
                [customer_id, total_amount, status]
            );
            const orderId = orderResult.insertId;

            for (const item of items) {
                await connection.execute(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.product_id, item.quantity, item.price]
                );
            }

            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getMonthlyRevenue() {
        const [rows] = await pool.execute(`
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(total_amount) as revenue 
      FROM orders 
      GROUP BY month 
      ORDER BY month DESC 
      LIMIT 12
    `);
        return rows;
    }
}

module.exports = Order;
