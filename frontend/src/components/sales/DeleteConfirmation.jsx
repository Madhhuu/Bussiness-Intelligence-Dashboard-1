import React from 'react';
import { AlertCircle } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, itemName }) => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050, fontFamily: "'Inter', sans-serif" }}>
            <div style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', border: isDarkMode ? '1px solid #334155' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: isDarkMode ? '#ef444415' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <AlertCircle style={{ color: '#ef4444' }} size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Delete Sale Record</h3>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Are you sure you want to delete this sale?</p>
                    </div>
                </div>
                {itemName && (
                    <div style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', color: isDarkMode ? '#cbd5e1' : '#475569', marginBottom: '20px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0' }}>
                        <strong style={{ color: isDarkMode ? '#f8fafc' : '#1e293b' }}>Record:</strong> {itemName}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#cbd5e1' : '#475569', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={onConfirm} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
