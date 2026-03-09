const pool = require('../config/db');

const getDashboardStats = async (req, res) => {
    try {
        const selectedYear = req.query.year || new Date().getFullYear();

        // Total Stats from Sales (Filtered by Year)
        const [kpiRows] = await pool.execute(
            'SELECT COUNT(*) as count, SUM(price * quantity) as revenue FROM sales WHERE YEAR(sale_date) = ?',
            [selectedYear]
        );
        const [customerRows] = await pool.execute('SELECT COUNT(*) as count FROM customers');

        const totalRevenue = kpiRows[0].revenue || 0;
        const totalOrders = kpiRows[0].count || 0;
        const totalCustomers = customerRows[0].count || 0;

        // Mock growth for now
        const monthlyGrowth = 12;

        // Monthly Revenue Trend for Line Chart (Filtered by Year)
        const [monthlyRows] = await pool.execute(
            `SELECT DATE_FORMAT(sale_date, '%b') as month, SUM(price * quantity) as revenue 
             FROM sales 
             WHERE YEAR(sale_date) = ?
             GROUP BY month 
             ORDER BY MIN(sale_date)`,
            [selectedYear]
        );

        // Map to format suitable for Chart.js (Ensure all 12 months are present)
        const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyDataMap = monthlyRows.reduce((acc, row) => {
            acc[row.month] = Number(row.revenue);
            return acc;
        }, {});

        const monthlyRevenue = {
            labels: allMonths,
            datasets: [{
                label: 'Revenue',
                data: allMonths.map(m => monthlyDataMap[m] || 0),
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                borderColor: '#3b82f6',
            }]
        };

        // Sales by Category for Bar Chart & Doughnut
        const [salesByCategoryRows] = await pool.execute(
            `SELECT category, COUNT(*) as count, SUM(price * quantity) as revenue 
             FROM sales 
             GROUP BY category`
        );

        const salesByCategory = {
            labels: salesByCategoryRows.map(row => row.category),
            datasets: [{
                label: 'Sales Count',
                data: salesByCategoryRows.map(row => Number(row.count)),
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
            }]
        };

        const categoryRevenue = {
            labels: salesByCategoryRows.map(row => row.category),
            datasets: [{
                data: salesByCategoryRows.map(row => Number(row.revenue)),
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
            }]
        };

        // Top Products
        const [topProductRows] = await pool.execute(
            `SELECT product_name as name, COUNT(*) as sales, SUM(price * quantity) as revenue 
             FROM sales 
             GROUP BY product_name 
             ORDER BY revenue DESC 
             LIMIT 5`
        );

        const totalRevenueAll = totalRevenue || 1;
        const topProducts = topProductRows.map(row => ({
            ...row,
            revenue: Number(row.revenue),
            pct: Math.round((Number(row.revenue) / totalRevenueAll) * 100)
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
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDashboardStats };

