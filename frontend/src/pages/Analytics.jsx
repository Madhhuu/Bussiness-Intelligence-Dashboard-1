import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TrendingUp, TrendingDown, Target, Percent, Activity, Clock,
    ArrowUpRight, ArrowDownRight, Calendar, Filter, ChevronDown, Search
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement, BarElement,
    Title, Tooltip, Legend, Filler, ArcElement, RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement,
    ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler
);

import AuthContext from '../context/AuthContext';
import config from '../config';

const cardStyle = (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
});

const Analytics = () => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    const [timeframe, setTimeframe] = useState('This Year');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const year = timeframe === 'This Year' ? new Date().getFullYear() : new Date().getFullYear() - 1;
                const res = await axios.get(`${config.API_URL}/analytics/dashboard?year=${year}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (error) {
                console.error('Error fetching analytics stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [timeframe]);

    if (loading) return <div className="p-8 text-slate-500">Loading Analytics...</div>;

    // ── Revenue Trend ────────────────────────────────────
    const revenueTrend = stats?.charts?.monthlySales ? {
        ...stats.charts.monthlySales,
        datasets: stats.charts.monthlySales.datasets.map(dataset => ({
            ...dataset,
            borderColor: accentColor,
            backgroundColor: `${accentColor}15`,
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 6,
        }))
    } : { labels: [], datasets: [] };

    // ── Category Revenue Breakdown (Doughnut) ──────────
    const categoryData = stats?.charts?.categoryRevenue ? {
        ...stats.charts.categoryRevenue,
        datasets: [{
            ...stats.charts.categoryRevenue.datasets[0],
            backgroundColor: [accentColor, '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#64748b'],
            borderWidth: 0,
            spacing: 4,
        }]
    } : { labels: [], datasets: [] };

    // ── Sales by Category (Bar) ───────────────────────
    const salesByCategoryData = stats?.charts?.salesByCategory || { labels: [], datasets: [] };

    // ── Category Performance (Radar Chart) ───────────────
    const radarData = stats?.charts?.categoryRevenue ? {
        labels: stats.charts.categoryRevenue.labels,
        datasets: [
            {
                label: 'Revenue Weight',
                data: stats.charts.categoryRevenue.datasets[0].data.map(v => (v / stats.kpi.totalRevenue) * 100),
                backgroundColor: `${accentColor}33`,
                borderColor: accentColor,
                borderWidth: 2,
            },
            {
                label: 'Unit Volume Weight',
                data: stats.charts.salesByCategory.datasets[0].data.map(v => (v / stats.kpi.totalOrders) * 100),
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: '#10b981',
                borderWidth: 2,
            }
        ],
    } : { labels: [], datasets: [] };

    // ── KPI Cards for Analytics (Focus on AOV/Efficiency) ──
    const analyticsKPIs = [
        { label: 'Avg Order Value', value: `₹${stats?.kpi?.totalOrders ? Math.round(stats.kpi.totalRevenue / stats.kpi.totalOrders).toLocaleString() : 0}`, icon: Activity, color: accentColor, bg: `${accentColor}15` },
        { label: 'Revenue/Customer', value: `₹${stats?.kpi?.totalCustomers ? Math.round(stats.kpi.totalRevenue / stats.kpi.totalCustomers).toLocaleString() : 0}`, icon: Target, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Sales Density', value: `${stats?.kpi?.totalOrders || 0} units`, icon: Clock, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Growth Target', value: '78%', icon: Percent, color: '#8b5cf6', bg: '#f5f3ff' },
    ];

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Performance Analytics</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Technical deep-dive into revenue streams and category efficiency.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Calendar size={18} color="#64748b" />
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        style={{
                            padding: '8px 16px', borderRadius: '10px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                            fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#cbd5e1' : '#475569',
                            backgroundColor: isDarkMode ? '#0f172a' : 'white', cursor: 'pointer', outline: 'none'
                        }}
                    >
                        <option value="This Year">This Year ({new Date().getFullYear()})</option>
                        <option value="Last Year">Last Year ({new Date().getFullYear() - 1})</option>
                    </select>
                </div>
            </div>

            {/* Analytical KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {analyticsKPIs.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} style={{ ...cardStyle(isDarkMode), padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: isDarkMode ? `${item.color}15` : item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={18} color={item.color} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', backgroundColor: isDarkMode ? '#064e3b' : '#ecfdf5', padding: '2px 6px', borderRadius: '4px', alignSelf: 'start' }}>+4.2%</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '2px' }}>{item.label}</div>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{item.value}</div>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* Advanced Trend Chart */}
                <div style={cardStyle(isDarkMode)}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Revenue Momentum</h3>
                    <div style={{ height: '320px' }}>
                        <Line
                            data={revenueTrend}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true, grid: { color: isDarkMode ? '#334155' : '#f1f5f9', borderDash: [5, 5] }, ticks: { color: '#94a3b8' } },
                                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Category Matrix (Radar) */}
                <div style={cardStyle(isDarkMode)}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Category Efficiency Matrix</h3>
                    <div style={{ height: '320px' }}>
                        <Radar
                            data={radarData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    r: {
                                        angleLines: { display: true, color: isDarkMode ? '#334155' : '#f1f5f9' },
                                        grid: { color: isDarkMode ? '#334155' : '#f1f5f9' },
                                        suggestedMin: 0,
                                        ticks: { display: false },
                                        pointLabels: { color: '#94a3b8', font: { size: 11 } }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: '20px' }}>
                {/* Volume Distribution */}
                <div style={cardStyle(isDarkMode)}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Sales Volume Analysis</h3>
                    <div style={{ height: '280px' }}>
                        <Bar
                            data={{
                                ...salesByCategoryData,
                                datasets: [{
                                    ...salesByCategoryData.datasets[0],
                                    backgroundColor: accentColor,
                                    borderRadius: 6
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                indexAxis: 'y',
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { grid: { color: isDarkMode ? '#334155' : '#f1f5f9' }, ticks: { color: '#94a3b8' } },
                                    y: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Top Performing Segments */}
                <div style={cardStyle(isDarkMode)}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Segment Leaders</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {stats?.topProducts?.slice(0, 4).map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: accentColor, fontSize: '14px' }}>
                                    #{i + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: isDarkMode ? '#cbd5e1' : '#1e293b' }}>{p.name}</div>
                                    <div style={{ width: '100%', height: '6px', backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', borderRadius: '3px', marginTop: '6px' }}>
                                        <div style={{ width: `${p.pct}%`, height: '100%', backgroundColor: accentColor, borderRadius: '3px' }}></div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: '13px', fontWeight: '700', color: isDarkMode ? '#cbd5e1' : '#0f172a' }}>{p.pct}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
