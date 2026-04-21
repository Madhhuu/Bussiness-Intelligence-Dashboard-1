import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getCustomers } from '../../services/customerService';
import AuthContext from '../../context/AuthContext';

const AddSaleModal = ({ isOpen, onClose, onSave }) => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    const [formData, setFormData] = useState({
        product_name: '',
        category: '',
        quantity: '',
        price: '',
        sale_date: '',
        customer_id: ''
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchCustomers = async () => {
                try {
                    const data = await getCustomers();
                    setCustomers(data || []);
                } catch (err) {
                    console.error('Error fetching customers for modal:', err);
                }
            };
            fetchCustomers();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputStyle = {
        width: '100%', padding: '12px', borderRadius: '10px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        fontSize: '14px', boxSizing: 'border-box',
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
        color: isDarkMode ? '#f1f5f9' : '#1e293b',
        outline: 'none'
    };

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, fontFamily: "'Inter', sans-serif" }}>
            <div style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '450px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: isDarkMode ? '1px solid #334155' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Add New Sale</h3>
                    <button onClick={onClose} style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '8px' }}>Customer (Optional)</label>
                        <select
                            name="customer_id"
                            value={formData.customer_id}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="">Select Customer</option>
                            {customers.map(c => (
                                <option key={c._id || c.id} value={c._id || c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '8px' }}>Product Name</label>
                        <input name="product_name" required value={formData.product_name} onChange={handleChange} placeholder="e.g. MacBook Pro M3" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '8px' }}>Category</label>
                        <select name="category" required value={formData.category} onChange={handleChange} style={inputStyle}>
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Food">Food</option>
                            <option value="Books">Books</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '8px' }}>Quantity</label>
                            <input type="number" min="1" name="quantity" required value={formData.quantity} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '8px' }}>Price (₹)</label>
                            <input type="number" min="0" step="0.01" name="price" required value={formData.price} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '8px' }}>Sale Date</label>
                        <input type="date" name="sale_date" required value={formData.sale_date} onChange={handleChange} style={{ ...inputStyle, colorScheme: isDarkMode ? 'dark' : 'light' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '11px 18px', borderRadius: '10px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ padding: '11px 18px', borderRadius: '10px', border: 'none', backgroundColor: accentColor, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: `0 4px 6px -1px ${accentColor}33` }}>Record Sale</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSaleModal;
