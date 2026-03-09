import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const SalesTable = ({ sales, onEdit, onDelete }) => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);

    if (!sales || sales.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0' }}>
                No sales records found. Add a new sale to get started.
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" }}>
                    <thead>
                        <tr style={{ borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                            {['ID', 'Product Name', 'Category', 'Quantity', 'Price', 'Revenue', 'Sale Date', 'Actions'].map((h) => (
                                <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => {
                            const revenue = Number(sale.quantity) * Number(sale.price);
                            return (
                                <tr key={sale.id} style={{ borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#fafbfc'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '500', color: isDarkMode ? '#94a3b8' : '#0f172a' }}>#{index + 1}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{sale.product_name}</td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <span style={{ fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '20px', backgroundColor: isDarkMode ? '#3b82f615' : '#eff6ff', color: '#3b82f6' }}>
                                            {sale.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#475569' }}>{sale.quantity}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#475569' }}>₹{Number(sale.price).toLocaleString()}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: '#10b981' }}>₹{revenue.toLocaleString()}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                                        {new Date(sale.sale_date).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => onEdit(sale)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#3b82f6', borderRadius: '6px' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#3b82f615' : '#eff6ff'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(sale)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#ef4444', borderRadius: '6px' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#ef444415' : '#fef2f2'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesTable;
