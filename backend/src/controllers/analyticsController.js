const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Customer = require('../models/customerModel');
const pool = require('../config/db');

const getDashboardStats = async (req, res) => {
    try {
        const [orderRows] = await pool.execute('SELECT COUNT(*) as count, SUM(total_amount) as revenue FROM orders');
        const [userRows] = await pool.execute('SELECT COUNT(*) as count FROM customers');
        const [productRows] = await pool.execute('SELECT COUNT(*) as count FROM products');

        const totalRevenue = orderRows[0].revenue || 0;
        const totalOrders = orderRows[0].count || 0;
        const totalCustomers = userRows[0].count || 0;

        // Mock growth for now or calculate from dates
        const monthlyGrowth = 12;

        // Get Monthly Revenue for Chart
        const monthlyRevenue = await Order.getMonthlyRevenue();

        res.json({
            kpi: {
                totalRevenue,
                totalOrders,
                totalCustomers,
                monthlyGrowth
            },
            charts: {
                revenue: monthlyRevenue
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDashboardStats };
