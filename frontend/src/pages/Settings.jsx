import React, { useState, useContext, useEffect } from 'react';
import { User, Bell, Shield, Palette, Save, Camera, Mail, Phone, MapPin, Globe, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import authService from '../services/authService';

const card = (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
    marginBottom: '20px',
});

const inputStyle = (isDarkMode) => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: isDarkMode ? '1px solid #475569' : '1px solid #e2e8f0',
    fontSize: '14px',
    color: isDarkMode ? '#f8fafc' : '#1e293b',
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
});

const labelStyle = (isDarkMode) => ({
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: isDarkMode ? '#94a3b8' : '#475569',
    marginBottom: '8px',
});

const Settings = () => {
    const {
        user, setUser, isDarkMode, setIsDarkMode,
        accentColor, setAccentColor,
        layoutDensity, setLayoutDensity
    } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(null);

    const [profile, setProfile] = useState({
        username: user?.username || 'Admin',
        email: user?.email || 'admin@gmail.com',
        phone: '+91 98765 43210',
        location: 'Tamil Nadu, India',
        website: 'https://bidashboard.com',
        bio: 'Business Intelligence Dashboard Administrator',
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifs: true,
        orderAlerts: true,
        weeklyReport: true,
        monthlyReport: false,
        securityAlerts: true,
        productUpdates: false,
    });

    useEffect(() => {
        if (user) {
            setProfile(p => ({
                ...p,
                username: user.username,
                email: user.email
            }));
        }
    }, [user]);

    const handleSave = async () => {
        try {
            setError(null);
            const updatedUser = await authService.updateProfile({
                username: profile.username,
                email: profile.email
            });

            // Update AuthContext and LocalStorage
            const userData = { ...user, username: updatedUser.username, email: updatedUser.email };
            localStorage.setItem('user', JSON.stringify(userData));
            if (setUser) setUser(userData);

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setError(null);
            await authService.updatePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            setSaved(true);
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password');
        }
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
                backgroundColor: checked ? accentColor : (isDarkMode ? '#334155' : '#e2e8f0'),
                position: 'relative', transition: 'all 0.2s', flexShrink: 0,
            }}
        >
            <div style={{
                width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'white',
                position: 'absolute', top: '3px', left: checked ? '23px' : '3px',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}></div>
        </div>
    );

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Settings</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Manage your account and preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '10px',
                        backgroundColor: saved ? '#10b981' : (isDarkMode ? '#3b82f6' : '#0f172a'),
                        color: 'white', border: 'none', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    }}
                >
                    {saved ? <CheckCircle style={{ width: '16px', height: '16px' }} /> : <Save style={{ width: '16px', height: '16px' }} />}
                    {saved ? 'Changes Saved!' : 'Save Changes'}
                </button>
            </div>

            {error && (
                <div style={{
                    padding: '12px 16px', borderRadius: '10px', backgroundColor: '#fee2e2', color: '#ef4444',
                    fontSize: '13px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px',
                    border: '1px solid #fecaca'
                }}>
                    <AlertCircle style={{ width: '16px', height: '16px' }} />
                    {error}
                </div>
            )}

            <div style={{ display: 'flex', gap: '24px' }}>
                {/* Tabs Sidebar */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                    <div style={{ ...card(isDarkMode), padding: '12px', marginBottom: 0 }}>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                                        padding: '12px 14px', borderRadius: '10px', border: 'none',
                                        backgroundColor: active ? (isDarkMode ? '#334155' : '#0f172a') : 'transparent',
                                        color: active ? 'white' : '#64748b',
                                        fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                        marginBottom: '4px', textAlign: 'left',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f1f5f9'; }}
                                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                >
                                    <Icon style={{ width: '18px', height: '18px', color: active ? accentColor : 'inherit' }} />
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
                            <div style={{ ...card(isDarkMode), display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '20px',
                                        background: `linear-gradient(135deg, ${accentColor}, #8b5cf6)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '28px', fontWeight: '700', color: 'white',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    }}>
                                        {profile.username[0]}
                                    </div>
                                    <div style={{
                                        position: 'absolute', bottom: '-4px', right: '-4px',
                                        width: '28px', height: '28px', borderRadius: '8px',
                                        backgroundColor: isDarkMode ? '#1e293b' : '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', border: `2px solid ${isDarkMode ? '#0f172a' : 'white'}`,
                                    }}>
                                        <Camera style={{ width: '14px', height: '14px', color: 'white' }} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{profile.username}</div>
                                    <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Administrator • Member since Jan 2026</div>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div style={card(isDarkMode)}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Personal Information</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={labelStyle(isDarkMode)}>Username</label>
                                        <input style={inputStyle(isDarkMode)} value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={labelStyle(isDarkMode)}><Mail style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Email</label>
                                        <input style={inputStyle(isDarkMode)} type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle(isDarkMode)}><Phone style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Phone</label>
                                        <input style={inputStyle(isDarkMode)} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle(isDarkMode)}><MapPin style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Location</label>
                                        <input style={inputStyle(isDarkMode)} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle(isDarkMode)}><Globe style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />Website</label>
                                        <input style={inputStyle(isDarkMode)} value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <label style={labelStyle(isDarkMode)}>Bio</label>
                                    <textarea style={{ ...inputStyle(isDarkMode), minHeight: '80px', resize: 'vertical' }} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* ── Notifications Tab ──────────────────── */}
                    {activeTab === 'notifications' && (
                        <div style={card(isDarkMode)}>
                            <h3 style={{ margin: '0 0 24px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Notification Preferences</h3>
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
                                    padding: '20px 0',
                                    borderBottom: i < 5 ? (isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9') : 'none',
                                }}>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>{item.title}</div>
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
                            <div style={card(isDarkMode)}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Change Password</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
                                    <div>
                                        <label style={labelStyle(isDarkMode)}>Current Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input style={inputStyle(isDarkMode)} type={showPassword ? 'text' : 'password'} placeholder="Enter current password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                            <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                                                {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle(isDarkMode)}>New Password</label>
                                        <input style={inputStyle(isDarkMode)} type="password" placeholder="Enter new password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle(isDarkMode)}>Confirm New Password</label>
                                        <input style={inputStyle(isDarkMode)} type="password" placeholder="Confirm new password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : '#e2e8f0'} />
                                    </div>
                                    <button
                                        onClick={handlePasswordUpdate}
                                        style={{
                                            padding: '12px 24px', borderRadius: '10px', backgroundColor: isDarkMode ? accentColor : '#0f172a', color: 'white',
                                            border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', alignSelf: 'flex-start',
                                            transition: 'transform 0.15s',
                                        }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                        Update Password
                                    </button>
                                </div>
                            </div>

                            {/* Sessions */}
                            <div style={card(isDarkMode)}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Active Sessions</h3>
                                {[
                                    { device: 'Chrome on Windows', location: 'New York, USA', time: 'Current session', current: true },
                                    { device: 'Safari on iPhone', location: 'New York, USA', time: '2 hours ago', current: false },
                                    { device: 'Firefox on MacBook', location: 'Boston, USA', time: '1 day ago', current: false },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '16px 0', borderBottom: i < 2 ? (isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9') : 'none',
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {s.device}
                                                {s.current && <span style={{ fontSize: '11px', fontWeight: '600', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>Active</span>}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{s.location} • {s.time}</div>
                                        </div>
                                        {!s.current && (
                                            <button style={{
                                                padding: '8px 16px', borderRadius: '8px', border: '1px solid #fecaca',
                                                backgroundColor: '#fef2f2', color: '#ef4444', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                                            }}>
                                                Revoke
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Danger Zone */}
                            <div style={{ ...card(isDarkMode), borderColor: '#fecaca', backgroundColor: isDarkMode ? '#451a1a' : '#fff5f5' }}>
                                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#ef4444' }}>Danger Zone</h3>
                                <p style={{ fontSize: '13px', color: isDarkMode ? '#fca5a5' : '#ef4444', margin: '0 0 16px', opacity: 0.8 }}>Irreversible and destructive actions</p>
                                <button style={{
                                    padding: '12px 24px', borderRadius: '10px', border: '1px solid #ef4444',
                                    backgroundColor: '#ef4444', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                    boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)',
                                }}>
                                    Delete Account
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Appearance Tab ─────────────────────── */}
                    {activeTab === 'appearance' && (
                        <>
                            <div style={card(isDarkMode)}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Theme</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                    {[
                                        { id: 'light', name: 'Light', bg: '#ffffff', text: '#0f172a', active: !isDarkMode },
                                        { id: 'dark', name: 'Dark', bg: '#0f172a', text: '#f8fafc', active: isDarkMode },
                                        { id: 'system', name: 'System', bg: 'linear-gradient(135deg, #ffffff 50%, #0f172a 50%)', text: isDarkMode ? '#f8fafc' : '#0f172a', active: false },
                                    ].map((theme) => (
                                        <div
                                            key={theme.name}
                                            onClick={() => theme.id === 'system' ? null : setIsDarkMode(theme.id === 'dark')}
                                            style={{
                                                padding: '24px 16px', borderRadius: '14px', cursor: 'pointer', textAlign: 'center',
                                                border: `2px solid ${theme.active ? accentColor : (isDarkMode ? '#334155' : '#e2e8f0')}`,
                                                background: theme.bg,
                                                transition: 'all 0.2s',
                                                transform: theme.active ? 'scale(1.02)' : 'scale(1)',
                                                boxShadow: theme.active ? `0 0 0 4px ${accentColor}15` : 'none',
                                            }}
                                        >
                                            <div style={{ fontSize: '14px', fontWeight: '700', color: theme.text }}>{theme.name}</div>
                                            {theme.active && <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: '800', color: accentColor }}>ACTIVE</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={card(isDarkMode)}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Accent Color</h3>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
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
                                            onClick={() => setAccentColor(c.color)}
                                            style={{
                                                width: '44px', height: '44px', borderRadius: '14px', backgroundColor: c.color,
                                                cursor: 'pointer', border: accentColor === c.color ? `3px solid ${isDarkMode ? 'white' : '#0f172a'}` : '3px solid transparent',
                                                transition: 'all 0.2s',
                                                transform: accentColor === c.color ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: accentColor === c.color ? `0 10px 15px -3px ${c.color}40` : 'none',
                                            }}
                                        >
                                            {accentColor === c.color && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }}></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={card(isDarkMode)}>
                                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Layout Density</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                    {['Compact', 'Comfortable', 'Spacious'].map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setLayoutDensity(d)}
                                            style={{
                                                padding: '14px', borderRadius: '12px', fontSize: '13px', fontWeight: '700',
                                                border: layoutDensity === d ? `2px solid ${accentColor}` : (isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'),
                                                backgroundColor: layoutDensity === d ? (isDarkMode ? `${accentColor}15` : '#eff6ff') : (isDarkMode ? '#0f172a' : 'white'),
                                                color: layoutDensity === d ? accentColor : '#64748b',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
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
