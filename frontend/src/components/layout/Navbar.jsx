import React, { useContext } from 'react';
import { Search, Bell, Sun } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{
            height: '64px',
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            fontFamily: "'Inter', system-ui, sans-serif",
        }}>
            {/* Left - Page Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Dashboard</h1>
                <span style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: '500' }}>
                    Overview
                </span>
            </div>

            {/* Right - Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            padding: '8px 16px 8px 40px',
                            borderRadius: '10px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: '#f8fafc',
                            outline: 'none',
                            fontSize: '13px',
                            width: '240px',
                            color: '#1e293b',
                            fontFamily: 'inherit',
                        }}
                    />
                    <Search style={{ width: '16px', height: '16px', color: '#94a3b8', position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* Notification */}
                <button style={{
                    position: 'relative',
                    background: 'none',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                }}>
                    <Bell style={{ width: '18px', height: '18px' }} />
                    <span style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ef4444',
                        borderRadius: '50%',
                        border: '2px solid white',
                    }}></span>
                </button>

                {/* Theme Toggle */}
                <button style={{
                    background: 'none',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                }}>
                    <Sun style={{ width: '18px', height: '18px' }} />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
