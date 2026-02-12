import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Save, Camera, Mail, Phone, MapPin, Globe, Eye, EyeOff } from 'lucide-react';

const card = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
    marginBottom: '20px',
};

const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
};

const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '6px',
};

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@gmail.com',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        website: 'https://bidashboard.com',
        bio: 'Business Intelligence Dashboard Administrator',
    });

    const [notifications, setNotifications] = useState({
        emailNotifs: true,
        orderAlerts: true,
        weeklyReport: true,
        monthlyReport: false,
        securityAlerts: true,
        productUpdates: false,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    const Toggle = ({ checked, onChange }) => (
        <div
            onClick={onChange}
            style={{
                width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                backgroundColor: checked ? '#3b82f6' : '#e2e8f0',
                position: 'relative', transition: 'background-color 0.2s', flexShrink: 0,
            }}
        >
            <div style={{
                width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
                position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}></div>
        </div>
    );

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Settings</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Manage your account and preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '10px',
                        backgroundColor: saved ? '#10b981' : '#0f172a', color: 'white', border: 'none', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600', transition: 'background-color 0.3s',
                    }}
                >
                    <Save style={{ width: '16px', height: '16px' }} />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
                {/* Tabs Sidebar */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                    <div style={{ ...card, padding: '12px', marginBottom: 0 }}>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                                        padding: '10px 14px', borderRadius: '10px', border: 'none',
                                        backgroundColor: active ? '#0f172a' : 'transparent',
                                        color: active ? 'white' : '#64748b',
                                        fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                        marginBottom: '4px', textAlign: 'left',
                                    }}
                                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                >
                                    <Icon style={{ width: '18px', height: '18px' }} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ flex: 1 }}>
                    {/* ── Profile Tab ────────────────────────── */}
                    {activeTab === 'profile' && (
                        <>
                            {/* Avatar Section */}
                            <div style={{ ...card, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '20px',
                                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '28px', fontWeight: '700', color: 'white',
                                    }}>
                                        {profile.firstName[0]}{profile.lastName[0]}
                                    </div>
                                    <div style={{
                                        position: 'absolute', bottom: '-4px', right: '-4px',
                                        width: '28px', height: '28px', borderRadius: '8px',
                                        backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', border: '2px solid white',
                                    }}>
                                        <Camera style={{ width: '14px', height: '14px', color: 'white' }} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{profile.firstName} {profile.lastName}</div>
                                    <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Administrator • Member since Jan 2026</div>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div style={card}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Personal Information</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={labelStyle}>First Name</label>
                                        <input style={inputStyle} value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Last Name</label>
                                        <input style={inputStyle} value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}><Mail style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Email</label>
                                        <input style={inputStyle} type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}><Phone style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Phone</label>
                                        <input style={inputStyle} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}><MapPin style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Location</label>
                                        <input style={inputStyle} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}><Globe style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Website</label>
                                        <input style={inputStyle} value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <label style={labelStyle}>Bio</label>
                                    <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* ── Notifications Tab ──────────────────── */}
                    {activeTab === 'notifications' && (
                        <div style={card}>
                            <h3 style={{ margin: '0 0 24px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Notification Preferences</h3>
                            {[
                                { key: 'emailNotifs', title: 'Email Notifications', desc: 'Receive email notifications for important updates' },
                                { key: 'orderAlerts', title: 'Order Alerts', desc: 'Get notified when new orders are placed' },
                                { key: 'weeklyReport', title: 'Weekly Report', desc: 'Receive a weekly summary of your business performance' },
                                { key: 'monthlyReport', title: 'Monthly Report', desc: 'Receive a detailed monthly analytics report' },
                                { key: 'securityAlerts', title: 'Security Alerts', desc: 'Get notified about security events and login activity' },
                                { key: 'productUpdates', title: 'Product Updates', desc: 'Receive notifications about new features and updates' },
                            ].map((item, i) => (
                                <div key={item.key} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '16px 0',
                                    borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none',
                                }}>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.title}</div>
                                        <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>{item.desc}</div>
                                    </div>
                                    <Toggle
                                        checked={notifications[item.key]}
                                        onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Security Tab ───────────────────────── */}
                    {activeTab === 'security' && (
                        <>
                            <div style={card}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Change Password</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
                                    <div>
                                        <label style={labelStyle}>Current Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input style={inputStyle} type={showPassword ? 'text' : 'password'} placeholder="Enter current password" onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                            <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                                                {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>New Password</label>
                                        <input style={inputStyle} type="password" placeholder="Enter new password" onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Confirm New Password</label>
                                        <input style={inputStyle} type="password" placeholder="Confirm new password" onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <button style={{
                                        padding: '10px 24px', borderRadius: '10px', backgroundColor: '#0f172a', color: 'white',
                                        border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', alignSelf: 'flex-start',
                                    }}>
                                        Update Password
                                    </button>
                                </div>
                            </div>

                            {/* Sessions */}
                            <div style={card}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Active Sessions</h3>
                                {[
                                    { device: 'Chrome on Windows', location: 'New York, USA', time: 'Current session', current: true },
                                    { device: 'Safari on iPhone', location: 'New York, USA', time: '2 hours ago', current: false },
                                    { device: 'Firefox on MacBook', location: 'Boston, USA', time: '1 day ago', current: false },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '14px 0', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none',
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {s.device}
                                                {s.current && <span style={{ fontSize: '11px', fontWeight: '600', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>Active</span>}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{s.location} • {s.time}</div>
                                        </div>
                                        {!s.current && (
                                            <button style={{
                                                padding: '6px 14px', borderRadius: '8px', border: '1px solid #fecaca',
                                                backgroundColor: '#fef2f2', color: '#ef4444', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                                            }}>
                                                Revoke
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Danger Zone */}
                            <div style={{ ...card, borderColor: '#fecaca' }}>
                                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#ef4444' }}>Danger Zone</h3>
                                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>Irreversible and destructive actions</p>
                                <button style={{
                                    padding: '10px 20px', borderRadius: '10px', border: '1px solid #fecaca',
                                    backgroundColor: '#fef2f2', color: '#ef4444', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                }}>
                                    Delete Account
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Appearance Tab ─────────────────────── */}
                    {activeTab === 'appearance' && (
                        <>
                            <div style={card}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Theme</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                    {[
                                        { name: 'Light', bg: '#ffffff', text: '#0f172a', border: '#3b82f6', selected: true },
                                        { name: 'Dark', bg: '#0f172a', text: '#f8fafc', border: '#334155', selected: false },
                                        { name: 'System', bg: 'linear-gradient(135deg, #ffffff 50%, #0f172a 50%)', text: '#475569', border: '#e2e8f0', selected: false },
                                    ].map((theme) => (
                                        <div
                                            key={theme.name}
                                            style={{
                                                padding: '20px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                                                border: `2px solid ${theme.selected ? '#3b82f6' : '#e2e8f0'}`,
                                                background: theme.bg.includes('gradient') ? theme.bg : theme.bg,
                                                backgroundColor: theme.bg.includes('gradient') ? undefined : theme.bg,
                                            }}
                                        >
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: theme.text }}>{theme.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={card}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Accent Color</h3>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {[
                                        { color: '#3b82f6', name: 'Blue' },
                                        { color: '#8b5cf6', name: 'Purple' },
                                        { color: '#10b981', name: 'Green' },
                                        { color: '#f59e0b', name: 'Amber' },
                                        { color: '#ef4444', name: 'Red' },
                                        { color: '#ec4899', name: 'Pink' },
                                    ].map((c) => (
                                        <div
                                            key={c.name}
                                            title={c.name}
                                            style={{
                                                width: '40px', height: '40px', borderRadius: '12px', backgroundColor: c.color,
                                                cursor: 'pointer', border: c.name === 'Blue' ? '3px solid #0f172a' : '3px solid transparent',
                                                transition: 'transform 0.15s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            <div style={card}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Layout Density</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                    {['Compact', 'Comfortable', 'Spacious'].map((d, i) => (
                                        <button
                                            key={d}
                                            style={{
                                                padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                                                border: i === 1 ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                                backgroundColor: i === 1 ? '#eff6ff' : 'white',
                                                color: i === 1 ? '#3b82f6' : '#64748b',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
