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

const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
};

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/analytics/dashboard', {
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
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', color: '#64748b', fontSize: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    const kpiData = [
        {
            title: 'Total Revenue',
            value: stats?.kpi?.totalRevenue ? `$${Number(stats.kpi.totalRevenue).toLocaleString()}` : '$0',
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
            color: '#3b82f6',
            bgColor: '#eff6ff',
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

    const revenueChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: [4500, 5200, 4800, 5800, 5600, 6900, 7200, 7800, 8100, 7600, 8900, 9200],
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                borderColor: '#3b82f6',
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#3b82f6',
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 3,
            },
        ],
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
                callbacks: {
                    label: (ctx) => `$${ctx.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { size: 12, family: "'Inter', sans-serif" } },
            },
            y: {
                grid: { color: '#f1f5f9' },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 12, family: "'Inter', sans-serif" },
                    callback: (val) => `$${(val / 1000).toFixed(0)}k`,
                },
            },
        },
    };

    const ordersBarData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Orders',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
            },
            {
                label: 'Returns',
                data: [5, 8, 4, 6, 3, 7, 2],
                backgroundColor: 'rgba(248, 113, 113, 0.6)',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
            },
        ],
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

    const categoryData = {
        labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
        datasets: [
            {
                data: [35, 25, 20, 12, 8],
                backgroundColor: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#94a3b8'],
                borderWidth: 0,
                spacing: 3,
            },
        ],
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

    const recentOrders = [
        { id: '#ORD-001', customer: 'Alice Johnson', product: 'Laptop Pro 15"', amount: '$1,299', status: 'Completed', statusColor: '#10b981', statusBg: '#ecfdf5' },
        { id: '#ORD-002', customer: 'Bob Smith', product: 'Wireless Headphones', amount: '$199', status: 'Processing', statusColor: '#f59e0b', statusBg: '#fffbeb' },
        { id: '#ORD-003', customer: 'Carol Davis', product: 'Smart Watch', amount: '$399', status: 'Shipped', statusColor: '#3b82f6', statusBg: '#eff6ff' },
        { id: '#ORD-004', customer: 'David Wilson', product: 'Tablet 11"', amount: '$649', status: 'Completed', statusColor: '#10b981', statusBg: '#ecfdf5' },
        { id: '#ORD-005', customer: 'Eva Martinez', product: 'Camera DSLR', amount: '$899', status: 'Cancelled', statusColor: '#ef4444', statusBg: '#fef2f2' },
    ];

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: '28px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
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
                        <div key={index} style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    backgroundColor: item.bgColor,
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
                                    backgroundColor: item.trend === 'up' ? '#ecfdf5' : '#fef2f2',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                }}>
                                    {item.trend === 'up' ? <ArrowUpRight style={{ width: '14px', height: '14px' }} /> : <ArrowDownRight style={{ width: '14px', height: '14px' }} />}
                                    {item.change}
                                </div>
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '500', color: '#64748b', marginBottom: '4px' }}>{item.title}</div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>{item.value}</div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Revenue Chart */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Revenue Overview</h3>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Monthly revenue for 2026</p>
                        </div>
                        <select style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', backgroundColor: '#f8fafc', outline: 'none', cursor: 'pointer' }}>
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div style={{ height: '280px' }}>
                        <Line data={revenueChartData} options={revenueChartOptions} />
                    </div>
                </div>

                {/* Category Doughnut */}
                <div style={cardStyle}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Sales by Category</h3>
                    <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Doughnut data={categoryData} options={doughnutOptions} />
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Orders Bar Chart */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Orders This Week</h3>
                    </div>
                    <div style={{ height: '260px' }}>
                        <Bar data={ordersBarData} options={ordersBarOptions} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={cardStyle}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { text: 'New order received from Alice Johnson', time: '2 min ago', icon: ShoppingCart, color: '#3b82f6', bg: '#eff6ff' },
                            { text: 'Stock alert — Wireless Headphones low', time: '15 min ago', icon: Package, color: '#f59e0b', bg: '#fffbeb' },
                            { text: 'Payment of $1,299 received', time: '1 hr ago', icon: DollarSign, color: '#10b981', bg: '#ecfdf5' },
                            { text: 'New customer registered: Eva Martinez', time: '3 hr ago', icon: Users, color: '#8b5cf6', bg: '#f5f3ff' },
                            { text: 'Monthly report generated', time: '5 hr ago', icon: TrendingUp, color: '#6366f1', bg: '#eef2ff' },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon style={{ width: '18px', height: '18px', color: item.color }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{item.text}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{item.time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Recent Orders</h3>
                    <button style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#3b82f6',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px 12px',
                        borderRadius: '8px',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        View All →
                    </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map((h) => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #f8fafc' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>{order.id}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{order.customer}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{order.product}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{order.amount}</td>
                                <td style={{ padding: '14px 16px' }}>
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: order.statusColor,
                                        backgroundColor: order.statusBg,
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
