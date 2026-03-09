import React, { useContext, useState } from 'react';
import { Search, Bell, Sun, Moon, CheckCircle, AlertTriangle } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const { user, searchQuery, setSearchQuery, isDarkMode, setIsDarkMode } = useContext(AuthContext);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: 'New sale: Laptop Pro 15"', time: '2m ago', icon: CheckCircle, color: '#10b981' },
        { id: 2, text: 'Stock low: iPhone 15 Case', time: '15m ago', icon: AlertTriangle, color: '#f59e0b' },
        { id: 3, text: 'Report generated successfully', time: '1h ago', icon: CheckCircle, color: '#3b82f6' },
    ];

    return (
        <div style={{
            height: '64px',
            backgroundColor: isDarkMode ? '#1e293b' : 'white',
            borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: 'all 0.3s ease'
        }}>
            {/* Left - Page Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#1e293b', margin: 0 }}>Dashboard</h1>
                <span style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: isDarkMode ? '#334155' : '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: '500' }}>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '8px 16px 8px 40px',
                            borderRadius: '10px',
                            border: isDarkMode ? '1px solid #475569' : '1px solid #e5e7eb',
                            backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                            outline: 'none',
                            fontSize: '13px',
                            width: '240px',
                            color: isDarkMode ? '#f8fafc' : '#1e293b',
                            fontFamily: 'inherit',
                        }}
                    />
                    <Search style={{ width: '16px', height: '16px', color: '#94a3b8', position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* Notification */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{
                            background: 'none',
                            border: isDarkMode ? '1px solid #475569' : '1px solid #e5e7eb',
                            borderRadius: '10px',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: showNotifications ? '#3b82f6' : '#64748b',
                            backgroundColor: showNotifications && !isDarkMode ? '#eff6ff' : 'transparent',
                        }}
                    >
                        <Bell style={{ width: '18px', height: '18px' }} />
                        <span style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#ef4444',
                            borderRadius: '50%',
                            border: `2px solid ${isDarkMode ? '#1e293b' : 'white'}`,
                        }}></span>
                    </button>

                    {showNotifications && (
                        <div style={{
                            position: 'absolute', top: '48px', right: 0, width: '300px',
                            backgroundColor: isDarkMode ? '#1e293b' : 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px', padding: '12px', zIndex: 100, border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9'
                        }}>
                            <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '12px', padding: '0 4px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Notifications</div>
                            {notifications.map(n => {
                                const Icon = n.icon;
                                return (
                                    <div key={n.id} style={{ display: 'flex', gap: '12px', padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f8fafc'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: n.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={16} color={n.color} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>{n.text}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{n.time}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    style={{
                        background: 'none',
                        border: isDarkMode ? '1px solid #475569' : '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDarkMode ? '#f59e0b' : '#64748b',
                    }}
                >
                    {isDarkMode ? <Moon style={{ width: '18px', height: '18px' }} /> : <Sun style={{ width: '18px', height: '18px' }} />}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
