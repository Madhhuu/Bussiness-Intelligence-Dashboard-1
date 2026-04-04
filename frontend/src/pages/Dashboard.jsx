import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import config from '../config';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const cardStyle = (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
});

const Dashboard = () => {
    const { searchQuery, isDarkMode, accentColor } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('This Year');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const year = timeframe === 'This Year' ? new Date().getFullYear() : new Date().getFullYear() - 1;
                const res = await axios.get(`${config.API_URL}/analytics/dashboard?year=${year}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [timeframe]);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', color: '#64748b', fontSize: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: `3px solid ${accentColor}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    const kpiData = [
        {
            title: 'Total Revenue',
            value: stats?.kpi?.totalRevenue ? `₹${Number(stats.kpi.totalRevenue).toLocaleString()}` : '₹0',
            change: '+20.1%',
            trend: 'up',
            icon: DollarSign,
            color: '#10b981',
            bgColor: '#ecfdf5',
        },
        {
            title: 'Total Orders',
            value: stats?.kpi?.totalOrders || '0',
            change: '+15.3%',
            trend: 'up',
            icon: ShoppingCart,
            color: accentColor,
            bgColor: `${accentColor}15`,
        },
        {
            title: 'Active Customers',
            value: stats?.kpi?.totalCustomers || '0',
            change: '+7.2%',
            trend: 'up',
            icon: Users,
            color: '#f59e0b',
            bgColor: '#fffbeb',
        },
        {
            title: 'Growth Rate',
            value: `${stats?.kpi?.monthlyGrowth || 0}%`,
            change: '-2.4%',
            trend: 'down',
            icon: TrendingUp,
            color: '#8b5cf6',
            bgColor: '#f5f3ff',
        },
    ];

    const revenueChartData = stats?.charts?.monthlySales ? {
        ...stats.charts.monthlySales,
        datasets: stats.charts.monthlySales.datasets.map(dataset => ({
            ...dataset,
            borderColor: accentColor,
            backgroundColor: `${accentColor}15`,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: accentColor,
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: accentColor,
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: 3,
        }))
    } : {
        labels: [],
        datasets: []
    };

    const revenueChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: { size: 12, family: "'Inter', sans-serif" },
                bodyFont: { size: 13, family: "'Inter', sans-serif", weight: '600' },
                padding: 12,
                cornerRadius: 10,
                label: (ctx) => `₹${ctx.raw.toLocaleString()}`,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { size: 12, family: "'Inter', sans-serif" } },
            },
            y: {
                min: 0,
                grid: { color: '#f1f5f9' },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 12, family: "'Inter', sans-serif" },
                    callback: (val) => val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`,
                },
            },
        },
    };

    const ordersBarData = stats?.charts?.categoryRevenue ? {
        labels: stats.charts.categoryRevenue.labels,
        datasets: [
            {
                label: 'Revenue by Category',
                data: stats.charts.categoryRevenue.datasets[0].data,
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
            }
        ],
    } : {
        labels: [],
        datasets: []
    };

    const ordersBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, font: { size: 12, family: "'Inter', sans-serif" } },
            },
            tooltip: {
                backgroundColor: '#1e293b',
                cornerRadius: 10,
                padding: 12,
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 12 } } },
            y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { size: 12 } } },
        },
    };

    const categoryData = stats?.charts?.categoryRevenue ? {
        labels: stats.charts.categoryRevenue.labels,
        datasets: [
            {
                data: stats.charts.categoryRevenue.datasets[0].data,
                backgroundColor: stats.charts.categoryRevenue.datasets[0].backgroundColor,
                borderWidth: 0,
                spacing: 3,
            },
        ],
    } : {
        labels: [],
        datasets: []
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, font: { size: 12, family: "'Inter', sans-serif" }, padding: 16, color: '#475569' },
            },
        },
    };

    // Filtered data for searching
    const allOrders = stats?.topProducts ? stats.topProducts.map((p, i) => ({
        id: `#ORD-00${i + 1}`,
        customer: 'Walk-in Customer',
        product: p.name,
        amount: `₹${Number(p.revenue).toLocaleString()}`,
        status: 'Completed',
        statusColor: '#10b981',
        statusBg: '#ecfdf5'
    })) : [
        { id: '#ORD-001', customer: 'Alice Johnson', product: 'Laptop Pro 15"', amount: '₹1,299', status: 'Completed', statusColor: '#10b981', statusBg: '#ecfdf5' },
    ];

    const recentOrders = allOrders.filter(order =>
        order.product.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
        order.customer.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
        order.id.toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    const allActivity = stats?.topProducts ? stats.topProducts.slice(0, 5).map((p, i) => ({
        text: `Sale of ${p.name} - ${p.sales} units`,
        time: `${i + 1} hr ago`,
        icon: ShoppingCart,
        color: accentColor,
        bg: `${accentColor}15`
    })) : [
        { text: 'Waiting for store activity...', time: 'Just now', icon: ShoppingCart, color: accentColor, bg: `${accentColor}15` }
    ];

    const recentActivity = allActivity.filter(activity =>
        activity.text.toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: '28px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                    Welcome back! 👋
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>
                    Here's what's happening with your store today.
                </p>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
                {kpiData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} style={cardStyle(isDarkMode)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    backgroundColor: isDarkMode ? `${item.color}15` : item.bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Icon style={{ width: '22px', height: '22px', color: item.color }} />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: item.trend === 'up' ? '#10b981' : '#ef4444',
                                    backgroundColor: item.trend === 'up' ? (isDarkMode ? '#064e3b' : '#ecfdf5') : (isDarkMode ? '#450a0a' : '#fef2f2'),
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                }}>
                                    {item.trend === 'up' ? <ArrowUpRight style={{ width: '14px', height: '14px' }} /> : <ArrowDownRight style={{ width: '14px', height: '14px' }} />}
                                    {item.change}
                                </div>
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '500', color: isDarkMode ? '#94a3b8' : '#64748b', marginBottom: '4px' }}>{item.title}</div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a', letterSpacing: '-0.02em' }}>{item.value}</div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Revenue Chart */}
                <div style={cardStyle(isDarkMode)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Revenue Overview</h3>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Monthly revenue for 2026</p>
                        </div>
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            style={{ padding: '6px 12px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', fontSize: '13px', color: isDarkMode ? '#cbd5e1' : '#475569', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="This Year">This Year</option>
                            <option value="Last Year">Last Year</option>
                        </select>
                    </div>
                    <div style={{ height: '280px' }}>
                        <Line data={revenueChartData} options={revenueChartOptions} />
                    </div>
                </div>

                {/* Category Doughnut */}
                <div style={cardStyle(isDarkMode)}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Sales by Category</h3>
                    <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Doughnut data={categoryData} options={doughnutOptions} />
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Orders Bar Chart */}
                <div style={cardStyle(isDarkMode)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Category Revenue</h3>
                    </div>
                    <div style={{ height: '260px' }}>
                        <Bar data={ordersBarData} options={ordersBarOptions} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={cardStyle(isDarkMode)}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {recentActivity.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: isDarkMode ? `${item.color}15` : item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon style={{ width: '18px', height: '18px', color: item.color }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '13px', fontWeight: '500', color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>{item.text}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{item.time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div style={cardStyle(isDarkMode)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Recent Orders</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9' }}>
                            {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map((h) => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: isDarkMode ? '1px solid #1e293b' : '1px solid #f8fafc' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#fafbfc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>{order.id}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '500', color: isDarkMode ? '#cbd5e1' : '#1e293b' }}>{order.customer}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{order.product}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{order.amount}</td>
                                <td style={{ padding: '14px 16px' }}>
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: order.statusColor,
                                        backgroundColor: isDarkMode ? `${order.statusColor}20` : order.statusBg,
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Spinner animation */}
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
