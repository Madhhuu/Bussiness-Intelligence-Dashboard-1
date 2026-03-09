import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, FileText, Settings, LogOut, Layers, Users } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Sales', path: '/sales', icon: FileText },
        { name: 'Customers', path: '/customers', icon: Users },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 },
        { name: 'Reports', path: '/reports', icon: FileText },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            width: '260px',
            minHeight: '100vh',
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontFamily: "'Inter', system-ui, sans-serif",
        }}>
            {/* Logo */}
            <div style={{
                padding: '24px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Layers style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em' }}>BI Dashboard</span>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '16px 12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '8px 12px', marginBottom: '4px' }}>
                    Main Menu
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <li key={item.path} style={{ marginBottom: '4px' }}>
                                <Link
                                    to={item.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: active ? '600' : '500',
                                        color: active ? 'white' : 'rgba(255,255,255,0.5)',
                                        backgroundColor: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                        }
                                    }}
                                >
                                    <Icon style={{ width: '20px', height: '20px', color: active ? '#3b82f6' : 'inherit' }} />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom User Section */}
            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                    }}>
                        A
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>Admin</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Administrator</div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', color: 'rgba(255,255,255,0.4)', display: 'flex' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                        title="Logout"
                    >
                        <LogOut style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
