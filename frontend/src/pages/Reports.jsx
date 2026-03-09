import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Download, Filter, ChevronLeft, ChevronRight, FileText, ArrowUpDown, Eye, CalendarDays } from 'lucide-react';

const ROWS_PER_PAGE = 8;

const statusStyles = {
    Completed: { color: '#10b981', bg: '#ecfdf5' },
    Processing: { color: '#f59e0b', bg: '#fffbeb' },
    Shipped: { color: '#3b82f6', bg: '#eff6ff' },
    Cancelled: { color: '#ef4444', bg: '#fef2f2' },
};

import AuthContext from '../context/AuthContext';

const cardStyle = (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '16px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
});

const Reports = () => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortField, setSortField] = useState('sale_date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/sales', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Transform sales to match the reports structure
                const formatted = res.data.map((sale, index) => ({
                    id: `ORD-${res.data.length - index}`,
                    customer: 'Client System', // Placeholder if not joined
                    product: sale.product_name,
                    qty: sale.quantity,
                    amount: sale.price * sale.quantity,
                    date: sale.sale_date.split('T')[0],
                    status: 'Completed' // Default status for sales records
                }));
                setOrders(formatted);
            } catch (error) {
                console.error('Error fetching reports data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filtered = useMemo(() => {
        let data = [...orders];
        if (search) {
            const q = search.toLowerCase();
            data = data.filter(o => o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.product.toLowerCase().includes(q));
        }
        if (statusFilter !== 'All') {
            data = data.filter(o => o.status === statusFilter);
        }
        data.sort((a, b) => {
            let aVal = a[sortField], bVal = b[sortField];
            if (sortField === 'amount' || sortField === 'qty') {
                return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return sortDir === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
        });
        return data;
    }, [search, statusFilter, sortField, sortDir, orders]);

    const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('asc');
        }
        setPage(1);
    };

    const totalRevenue = filtered.reduce((s, o) => s + o.amount, 0);

    const handleExport = () => {
        const headers = ['Order ID', 'Product', 'Qty', 'Amount', 'Date', 'Status'];
        const rows = filtered.map(o => [o.id, o.product, o.qty, o.amount, o.date, o.status]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sales_report.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="p-8 text-slate-500">Generating Report...</div>;

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Sales Reports</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Generated from dynamic backend data</p>
                </div>
                <button
                    onClick={handleExport}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
                        backgroundColor: isDarkMode ? accentColor : '#0f172a', color: 'white', border: 'none', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Download style={{ width: '16px', height: '16px' }} />
                    Export CSV
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { label: 'Record Count', value: filtered.length, icon: FileText, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: Download, color: '#10b981', bg: '#ecfdf5' },
                    { label: 'Avg. Transaction', value: `₹${filtered.length ? Math.round(totalRevenue / filtered.length) : 0}`, icon: CalendarDays, color: '#f59e0b', bg: '#fffbeb' },
                ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} style={{ ...cardStyle(isDarkMode), padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: isDarkMode ? `${item.color}15` : item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon size={20} color={item.color} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.label}</div>
                                <div style={{ fontSize: '20px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{item.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={cardStyle(isDarkMode)}>
                <div style={{ padding: '20px 24px', borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%', padding: '10px 16px 10px 40px', borderRadius: '10px',
                                border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                                backgroundColor: isDarkMode ? '#0f172a' : 'white',
                                color: isDarkMode ? '#f1f5f9' : '#1e293b',
                                fontSize: '13px', outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9', textAlign: 'left' }}>
                                {['id', 'product', 'qty', 'amount', 'date'].map((col) => (
                                    <th key={col}
                                        onClick={() => handleSort(col)}
                                        style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {col.replace('_', ' ')}
                                            {sortField === col && <ArrowUpDown size={12} />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((order) => (
                                <tr key={order.id} style={{ borderBottom: isDarkMode ? '1px solid #1e293b' : '1px solid #f8fafc' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#fafbfc'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>{order.id}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '13px', color: isDarkMode ? '#cbd5e1' : '#1e293b' }}>{order.product}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '13px', color: isDarkMode ? '#94a3b8' : '#64748b' }}>{order.qty}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>₹{order.amount.toLocaleString()}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '13px', color: isDarkMode ? '#94a3b8' : '#64748b' }}>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
