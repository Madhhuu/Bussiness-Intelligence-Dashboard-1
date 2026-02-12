import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut, Radar, Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target, Percent, Clock } from 'lucide-react';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const card = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
};

const Analytics = () => {
    const [period, setPeriod] = useState('monthly');

    // ── Revenue Trend (Area) ─────────────────────────────
    const revenueTrend = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'This Year',
                data: [4200, 5100, 4800, 6200, 5900, 7300, 7800, 8200, 7600, 8900, 9400, 10200],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.08)',
                fill: true,
                tension: 0.4,
                borderWidth: 2.5,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#3b82f6',
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 3,
            },
            {
                label: 'Last Year',
                data: [3800, 4200, 4500, 5100, 4800, 5600, 6200, 6800, 6400, 7200, 7800, 8500],
                borderColor: '#94a3b8',
                backgroundColor: 'rgba(148,163,184,0.05)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                borderDash: [6, 4],
                pointRadius: 0,
                pointHoverRadius: 5,
            },
        ],
    };

    const areaOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, font: { size: 12, family: "'Inter', sans-serif" }, padding: 20 } },
            tooltip: { backgroundColor: '#1e293b', cornerRadius: 10, padding: 12, titleFont: { size: 12 }, bodyFont: { size: 13, weight: '600' }, callbacks: { label: (ctx) => `$${ctx.raw.toLocaleString()}` } },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 12 } } },
            y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { size: 12 }, callback: (v) => `$${(v / 1000).toFixed(0)}k` } },
        },
    };

    // ── Conversion Funnel (Horizontal Bar) ───────────────
    const funnelData = {
        labels: ['Visitors', 'Product Views', 'Add to Cart', 'Checkout', 'Purchases'],
        datasets: [
            {
                label: 'Users',
                data: [12500, 8200, 4100, 2800, 1950],
                backgroundColor: ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc'],
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.7,
            },
        ],
    };

    const funnelOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#1e293b', cornerRadius: 10, padding: 12 },
        },
        scales: {
            x: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { size: 12 }, callback: (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v } },
            y: { grid: { display: false }, ticks: { color: '#475569', font: { size: 13, weight: '500' } } },
        },
    };

    // ── Performance Radar ────────────────────────────────
    const radarData = {
        labels: ['Sales', 'Marketing', 'Support', 'Development', 'Design', 'Operations'],
        datasets: [
            {
                label: 'Current',
                data: [85, 72, 90, 78, 65, 88],
                backgroundColor: 'rgba(59,130,246,0.15)',
                borderColor: '#3b82f6',
                borderWidth: 2,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 5,
            },
            {
                label: 'Target',
                data: [90, 85, 95, 90, 80, 92],
                backgroundColor: 'rgba(16,185,129,0.08)',
                borderColor: '#10b981',
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: '#10b981',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, font: { size: 12 } } },
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 20, display: false },
                grid: { color: '#e2e8f0' },
                pointLabels: { font: { size: 12, family: "'Inter', sans-serif", weight: '500' }, color: '#475569' },
            },
        },
    };

    // ── Revenue by Channel (Doughnut) ────────────────────
    const channelData = {
        labels: ['Direct', 'Organic Search', 'Social Media', 'Email', 'Referral', 'Paid Ads'],
        datasets: [
            {
                data: [30, 25, 18, 12, 10, 5],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#64748b'],
                borderWidth: 0,
                spacing: 4,
            },
        ],
    };

    const doughnutOpts = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { position: 'right', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, font: { size: 12, family: "'Inter', sans-serif" }, padding: 14, color: '#475569' } },
        },
    };

    // ── Hourly Traffic (Bar) ─────────────────────────────
    const hourlyData = {
        labels: ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
        datasets: [
            {
                label: 'Page Views',
                data: [320, 890, 1400, 1800, 1650, 1900, 2100, 1700, 900],
                backgroundColor: (ctx) => {
                    const val = ctx.raw;
                    return val > 1800 ? 'rgba(59,130,246,0.8)' : 'rgba(59,130,246,0.35)';
                },
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.6,
            },
        ],
    };

    const hourlyOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e293b', cornerRadius: 10, padding: 12 } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
            y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
        },
    };

    // ── Quick Stats ──────────────────────────────────────
    const quickStats = [
        { label: 'Avg. Order Value', value: '$127.50', change: '+8.2%', up: true, icon: Target, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Conversion Rate', value: '3.24%', change: '+0.5%', up: true, icon: Percent, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Bounce Rate', value: '32.1%', change: '-4.1%', up: true, icon: Activity, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Avg. Session', value: '4m 32s', change: '+12s', up: true, icon: Clock, color: '#8b5cf6', bg: '#f5f3ff' },
    ];

    // ── Top Products ─────────────────────────────────────
    const topProducts = [
        { name: 'Laptop Pro 15"', sales: 342, revenue: '$444,258', pct: 92 },
        { name: 'Wireless Headphones', sales: 281, revenue: '$55,919', pct: 76 },
        { name: 'Smart Watch Ultra', sales: 198, revenue: '$79,002', pct: 58 },
        { name: 'Tablet 11"', sales: 156, revenue: '$101,244', pct: 45 },
        { name: 'Camera DSLR', sales: 124, revenue: '$111,476', pct: 36 },
    ];

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Analytics</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Detailed insights into your business performance</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['daily', 'weekly', 'monthly'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '10px',
                                border: period === p ? 'none' : '1px solid #e2e8f0',
                                backgroundColor: period === p ? '#0f172a' : 'white',
                                color: period === p ? 'white' : '#475569',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {quickStats.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} style={{ ...card, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon style={{ width: '22px', height: '22px', color: item.color }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '12px', fontWeight: '500', color: '#94a3b8', marginBottom: '2px' }}>{item.label}</div>
                                <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>{item.value}</div>
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: item.up ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                {item.up ? <TrendingUp style={{ width: '14px', height: '14px' }} /> : <TrendingDown style={{ width: '14px', height: '14px' }} />}
                                {item.change}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Revenue Trend — Full Width */}
            <div style={{ ...card, marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Revenue Trend</h3>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Year-over-year comparison</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>$85,900</div>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                            <TrendingUp style={{ width: '14px', height: '14px' }} /> +14.2% vs last year
                        </div>
                    </div>
                </div>
                <div style={{ height: '320px' }}>
                    <Line data={revenueTrend} options={areaOptions} />
                </div>
            </div>

            {/* Middle Row: Funnel + Radar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Conversion Funnel */}
                <div style={card}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Conversion Funnel</h3>
                    <div style={{ height: '280px' }}>
                        <Bar data={funnelData} options={funnelOptions} />
                    </div>
                </div>

                {/* Performance Radar */}
                <div style={card}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Department Performance</h3>
                    <div style={{ height: '280px' }}>
                        <Radar data={radarData} options={radarOptions} />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Hourly Traffic + Channel Breakdown + Top Products */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Hourly Traffic */}
                <div style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Traffic by Hour</h3>
                        <span style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: '#f8fafc', padding: '4px 10px', borderRadius: '6px', fontWeight: '500' }}>Today</span>
                    </div>
                    <div style={{ height: '260px' }}>
                        <Bar data={hourlyData} options={hourlyOpts} />
                    </div>
                </div>

                {/* Revenue by Channel */}
                <div style={card}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Revenue by Channel</h3>
                    <div style={{ height: '260px' }}>
                        <Doughnut data={channelData} options={doughnutOpts} />
                    </div>
                </div>
            </div>

            {/* Top Products */}
            <div style={card}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Top Products</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {topProducts.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8', width: '24px', textAlign: 'center' }}>
                                {i + 1}
                            </span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{p.name}</span>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{p.revenue}</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${p.pct}%`,
                                        borderRadius: '3px',
                                        background: i === 0 ? 'linear-gradient(90deg, #3b82f6, #6366f1)' : i === 1 ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : i === 2 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #94a3b8, #cbd5e1)',
                                        transition: 'width 0.5s ease',
                                    }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{p.sales} sales</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{p.pct}% of total</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
