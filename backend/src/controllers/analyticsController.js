const Sale = require('../models/saleModel');
const Customer = require('../models/customerModel');
const mongoose = require('mongoose');

const getDashboardStats = async (req, res) => {
    try {
        const selectedYear = parseInt(req.query.year) || new Date().getFullYear();
        const startOfYear = new Date(`${selectedYear}-01-01`);
        const endOfYear = new Date(`${selectedYear}-12-31T23:59:59`);

        // 1. KPI Stats (Total Revenue, Total Orders for Selected Year)
        const kpiStats = await Sale.aggregate([
            {
                $match: {
                    sale_date: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    revenue: { $sum: { $multiply: ["$price", "$quantity"] } }
                }
            }
        ]);

        // 2. Total Customers (Total count from Customer collection)
        const totalCustomers = await Customer.countDocuments();

        const totalRevenue = kpiStats.length > 0 ? kpiStats[0].revenue : 0;
        const totalOrders = kpiStats.length > 0 ? kpiStats[0].count : 0;
        const monthlyGrowth = 12; // Placeholder growth

        // 3. Monthly Revenue Trend (Group by Month)
        const monthlyRows = await Sale.aggregate([
            {
                $match: {
                    sale_date: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            {
                $group: {
                    _id: { $month: "$sale_date" },
                    revenue: { $sum: { $multiply: ["$price", "$quantity"] } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyRevenueData = new Array(12).fill(0);
        monthlyRows.forEach(row => {
            monthlyRevenueData[row._id - 1] = row.revenue;
        });

        const monthlyRevenue = {
            labels: allMonths,
            datasets: [{
                label: 'Revenue',
                data: monthlyRevenueData,
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                borderColor: '#3b82f6',
            }]
        };

        // 4. Sales by Category (Group by Category)
        const salesByCategoryRows = await Sale.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    revenue: { $sum: { $multiply: ["$price", "$quantity"] } }
                }
            }
        ]);

        const salesByCategory = {
            labels: salesByCategoryRows.map(row => row._id),
            datasets: [{
                label: 'Sales Count',
                data: salesByCategoryRows.map(row => row.count),
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
            }]
        };

        const categoryRevenue = {
            labels: salesByCategoryRows.map(row => row._id),
            datasets: [{
                data: salesByCategoryRows.map(row => row.revenue),
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
            }]
        };

        // 5. Top Products
        const topProductRows = await Sale.aggregate([
            {
                $group: {
                    _id: "$product_name",
                    revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
                    sales: { $sum: 1 }
                }
            },
            { $sort: { revenue: -1 } },
            { $limit: 5 }
        ]);

        const totalRevenueAll = totalRevenue || 1;
        const topProducts = topProductRows.map(row => ({
            name: row._id,
            sales: row.sales,
            revenue: row.revenue,
            pct: Math.round((row.revenue / totalRevenueAll) * 100)
        }));

        res.json({
            kpi: {
                totalRevenue,
                totalOrders,
                totalCustomers,
                monthlyGrowth
            },
            charts: {
                monthlySales: monthlyRevenue,
                categoryRevenue,
                salesByCategory
            },
            topProducts
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve analytics data', error: error.message });
    }
};

module.exports = { getDashboardStats };

