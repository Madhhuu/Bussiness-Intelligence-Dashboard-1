import React, { useState } from 'react';
import { X } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const AddCustomerModal = ({ isOpen, onClose, onSave }) => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            setFormData({ name: '', email: '', phone: '', address: '' });
            onClose();
        } catch (error) {
            console.error('Error in modal submission:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const overlayStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(15, 23, 42, 0.75)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        backdropFilter: 'blur(4px)',
    };

    const modalStyle = {
        backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '16px', width: '100%',
        maxWidth: '480px', padding: '32px', position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: isDarkMode ? '1px solid #334155' : 'none'
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', borderRadius: '8px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        fontSize: '14px', marginBottom: '16px',
        backgroundColor: isDarkMode ? '#0f172a' : 'white',
        color: isDarkMode ? '#f1f5f9' : '#1e293b',
        outline: 'none', transition: 'border-color 0.2s',
    };

    const labelStyle = {
        display: 'block', fontSize: '12px', fontWeight: '600',
        color: isDarkMode ? '#94a3b8' : '#475569', marginBottom: '6px'
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                    <X size={20} />
                </button>
                <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Add New Customer</h2>
                <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#64748b' }}>Enter the details to register a new client.</p>

                <form onSubmit={handleSubmit}>
                    <label style={labelStyle}>Full Name *</label>
                    <input name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="e.g. Alice Johnson" />

                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="alice@example.com" />

                    <label style={labelStyle}>Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" />

                    <label style={labelStyle}>Office Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', fontFamily: 'inherit' }} placeholder="e.g. 123 Tech Park, Bangalore" />

                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#94a3b8' : '#475569', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: accentColor, color: 'white', fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Saving...' : 'Save Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal;
