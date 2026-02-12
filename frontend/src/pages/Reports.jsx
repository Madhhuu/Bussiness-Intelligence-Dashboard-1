import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, ChevronLeft, ChevronRight, FileText, ArrowUpDown, Eye, MoreHorizontal, CalendarDays } from 'lucide-react';

const allOrders = [
    { id: 'ORD-2601', customer: 'Alice Johnson', email: 'alice@mail.com', product: 'Laptop Pro 15"', qty: 1, amount: 1299, date: '2026-02-12', status: 'Completed' },
    { id: 'ORD-2602', customer: 'Bob Smith', email: 'bob@mail.com', product: 'Wireless Headphones', qty: 2, amount: 398, date: '2026-02-11', status: 'Processing' },
    { id: 'ORD-2603', customer: 'Carol Davis', email: 'carol@mail.com', product: 'Smart Watch Ultra', qty: 1, amount: 399, date: '2026-02-11', status: 'Shipped' },
    { id: 'ORD-2604', customer: 'David Wilson', email: 'david@mail.com', product: 'Tablet 11"', qty: 1, amount: 649, date: '2026-02-10', status: 'Completed' },
    { id: 'ORD-2605', customer: 'Eva Martinez', email: 'eva@mail.com', product: 'Camera DSLR', qty: 1, amount: 899, date: '2026-02-10', status: 'Cancelled' },
    { id: 'ORD-2606', customer: 'Frank Lee', email: 'frank@mail.com', product: 'Keyboard MX Keys', qty: 3, amount: 297, date: '2026-02-09', status: 'Completed' },
    { id: 'ORD-2607', customer: 'Grace Kim', email: 'grace@mail.com', product: 'Monitor 27" 4K', qty: 1, amount: 549, date: '2026-02-09', status: 'Shipped' },
    { id: 'ORD-2608', customer: 'Henry Brown', email: 'henry@mail.com', product: 'USB-C Hub', qty: 5, amount: 245, date: '2026-02-08', status: 'Processing' },
    { id: 'ORD-2609', customer: 'Ivy Chen', email: 'ivy@mail.com', product: 'Desk Lamp LED', qty: 2, amount: 78, date: '2026-02-08', status: 'Completed' },
    { id: 'ORD-2610', customer: 'Jack Taylor', email: 'jack@mail.com', product: 'Webcam HD', qty: 1, amount: 129, date: '2026-02-07', status: 'Completed' },
    { id: 'ORD-2611', customer: 'Karen White', email: 'karen@mail.com', product: 'Mouse MX Master', qty: 1, amount: 99, date: '2026-02-07', status: 'Shipped' },
    { id: 'ORD-2612', customer: 'Leo Adams', email: 'leo@mail.com', product: 'SSD 1TB NVMe', qty: 2, amount: 198, date: '2026-02-06', status: 'Processing' },
    { id: 'ORD-2613', customer: 'Mia Thompson', email: 'mia@mail.com', product: 'Laptop Pro 15"', qty: 1, amount: 1299, date: '2026-02-06', status: 'Completed' },
    { id: 'ORD-2614', customer: 'Noah Garcia', email: 'noah@mail.com', product: 'Wireless Earbuds', qty: 1, amount: 149, date: '2026-02-05', status: 'Cancelled' },
    { id: 'ORD-2615', customer: 'Olivia Perez', email: 'olivia@mail.com', product: 'Mechanical Keyboard', qty: 1, amount: 169, date: '2026-02-05', status: 'Completed' },
    { id: 'ORD-2616', customer: 'Paul Wright', email: 'paul@mail.com', product: 'Standing Desk', qty: 1, amount: 799, date: '2026-02-04', status: 'Shipped' },
    { id: 'ORD-2617', customer: 'Quinn Hall', email: 'quinn@mail.com', product: 'Tablet 11"', qty: 2, amount: 1298, date: '2026-02-04', status: 'Completed' },
    { id: 'ORD-2618', customer: 'Ruby Scott', email: 'ruby@mail.com', product: 'External HDD 2TB', qty: 1, amount: 89, date: '2026-02-03', status: 'Processing' },
    { id: 'ORD-2619', customer: 'Sam Morgan', email: 'sam@mail.com', product: 'Smart Watch Ultra', qty: 1, amount: 399, date: '2026-02-03', status: 'Completed' },
    { id: 'ORD-2620', customer: 'Tina Reed', email: 'tina@mail.com', product: 'Wireless Headphones', qty: 1, amount: 199, date: '2026-02-02', status: 'Shipped' },
];

const ROWS_PER_PAGE = 8;

const statusStyles = {
    Completed: { color: '#10b981', bg: '#ecfdf5' },
    Processing: { color: '#f59e0b', bg: '#fffbeb' },
    Shipped: { color: '#3b82f6', bg: '#eff6ff' },
    Cancelled: { color: '#ef4444', bg: '#fef2f2' },
};

const card = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
};

const Reports = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortField, setSortField] = useState('date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        let data = [...allOrders];
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
    }, [search, statusFilter, sortField, sortDir]);

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
    const completedCount = filtered.filter(o => o.status === 'Completed').length;

    const handleExport = () => {
        const headers = ['Order ID', 'Customer', 'Email', 'Product', 'Qty', 'Amount', 'Date', 'Status'];
        const rows = filtered.map(o => [o.id, o.customer, o.email, o.product, o.qty, o.amount, o.date, o.status]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders_report.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Reports</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>View and export your order data</p>
                </div>
                <button
                    onClick={handleExport}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
                        backgroundColor: '#0f172a', color: 'white', border: 'none', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
                >
                    <Download style={{ width: '16px', height: '16px' }} />
                    Export CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Orders', value: filtered.length, icon: FileText, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: Download, color: '#10b981', bg: '#ecfdf5' },
                    { label: 'Completed', value: completedCount, icon: Filter, color: '#8b5cf6', bg: '#f5f3ff' },
                    { label: 'Avg. Order', value: `$${filtered.length ? Math.round(totalRevenue / filtered.length) : 0}`, icon: CalendarDays, color: '#f59e0b', bg: '#fffbeb' },
                ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} style={{ ...card, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon style={{ width: '20px', height: '20px', color: item.color }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: '500', color: '#94a3b8' }}>{item.label}</div>
                                <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>{item.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Table Card */}
            <div style={card}>
                {/* Toolbar */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                        <input
                            type="text"
                            placeholder="Search orders, customers, products..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            style={{
                                width: '100%', padding: '10px 16px 10px 40px', borderRadius: '10px',
                                border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none',
                                backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'inherit',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                        <Search style={{ width: '16px', height: '16px', color: '#94a3b8', position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>

                    {/* Status Filter */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {['All', 'Completed', 'Processing', 'Shipped', 'Cancelled'].map((s) => (
                            <button
                                key={s}
                                onClick={() => { setStatusFilter(s); setPage(1); }}
                                style={{
                                    padding: '7px 14px',
                                    borderRadius: '8px',
                                    border: statusFilter === s ? 'none' : '1px solid #e2e8f0',
                                    backgroundColor: statusFilter === s ? '#0f172a' : 'white',
                                    color: statusFilter === s ? 'white' : '#64748b',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                {[
                                    { key: 'id', label: 'Order ID' },
                                    { key: 'customer', label: 'Customer' },
                                    { key: 'product', label: 'Product' },
                                    { key: 'qty', label: 'Qty' },
                                    { key: 'amount', label: 'Amount' },
                                    { key: 'date', label: 'Date' },
                                    { key: 'status', label: 'Status' },
                                ].map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() => handleSort(col.key)}
                                        style={{
                                            textAlign: 'left', padding: '14px 16px', fontSize: '12px', fontWeight: '600',
                                            color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em',
                                            cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            {col.label}
                                            <ArrowUpDown style={{ width: '12px', height: '12px', opacity: sortField === col.key ? 1 : 0.3 }} />
                                        </span>
                                    </th>
                                ))}
                                <th style={{ padding: '14px 16px', width: '48px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((order, idx) => {
                                    const st = statusStyles[order.status] || { color: '#64748b', bg: '#f1f5f9' };
                                    return (
                                        <tr
                                            key={order.id}
                                            style={{ borderBottom: '1px solid #f8fafc' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>{order.id}</td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{order.customer}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{order.email}</div>
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>{order.product}</td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569', textAlign: 'center' }}>{order.qty}</td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>${order.amount.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{order.date}</td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <span style={{
                                                    fontSize: '12px', fontWeight: '600', color: st.color, backgroundColor: st.bg,
                                                    padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap',
                                                }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', borderRadius: '6px', display: 'flex' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                                >
                                                    <Eye style={{ width: '16px', height: '16px' }} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                        Showing <span style={{ fontWeight: '600', color: '#475569' }}>{((page - 1) * ROWS_PER_PAGE) + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}</span> of <span style={{ fontWeight: '600', color: '#475569' }}>{filtered.length}</span> orders
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            style={{
                                padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                backgroundColor: 'white', cursor: page === 1 ? 'not-allowed' : 'pointer',
                                color: page === 1 ? '#cbd5e1' : '#475569', display: 'flex', alignItems: 'center',
                                fontSize: '13px', fontWeight: '500', gap: '4px',
                            }}
                        >
                            <ChevronLeft style={{ width: '16px', height: '16px' }} /> Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                style={{
                                    width: '36px', height: '36px', borderRadius: '8px',
                                    border: page === p ? 'none' : '1px solid #e2e8f0',
                                    backgroundColor: page === p ? '#0f172a' : 'white',
                                    color: page === p ? 'white' : '#475569',
                                    fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                }}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            style={{
                                padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                backgroundColor: 'white', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                color: page === totalPages ? '#cbd5e1' : '#475569', display: 'flex', alignItems: 'center',
                                fontSize: '13px', fontWeight: '500', gap: '4px',
                            }}
                        >
                            Next <ChevronRight style={{ width: '16px', height: '16px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
