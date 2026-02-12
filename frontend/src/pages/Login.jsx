import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Layers } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const res = await login(email, password);
        setIsLoading(false);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#252b57', padding: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Main Card Container */}
            <div style={{ width: '100%', maxWidth: '1000px', height: '600px', backgroundColor: 'white', borderRadius: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>

                {/* Left Side - Login Form */}
                <div style={{ width: '40%', padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: 'white', height: '100%' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ backgroundColor: '#242b5c', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Layers style={{ width: '20px', height: '20px', color: 'white' }} />
                        </div>
                        <div style={{ color: '#242b5c', fontWeight: 'bold', fontSize: '18px', lineHeight: '1.2' }}>
                            BI Dashboard
                        </div>
                    </div>

                    {/* Form Container */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '280px', margin: '16px auto 0' }}>
                        {/* User Icon */}
                        <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: '3px solid #242b5c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#242b5c', marginBottom: '32px' }}>
                            <User style={{ width: '48px', height: '48px' }} strokeWidth={1.5} />
                        </div>

                        {error && (
                            <div style={{ width: '100%', color: '#ef4444', fontSize: '12px', textAlign: 'center', marginBottom: '12px', backgroundColor: '#fef2f2', padding: '6px', borderRadius: '6px' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div style={{ position: 'relative', marginBottom: '16px' }}>
                                <input
                                    type="email"
                                    required
                                    style={{ width: '100%', padding: '12px 20px 12px 48px', borderRadius: '9999px', border: '1px solid #9ca3af', color: '#374151', fontSize: '12px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', outline: 'none', boxSizing: 'border-box', height: '44px' }}
                                    placeholder="USERNAME"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#242b5c'}
                                    onBlur={(e) => e.target.style.borderColor = '#9ca3af'}
                                />
                                <User style={{ width: '16px', height: '16px', color: '#6b7280', position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>

                            <div style={{ position: 'relative', marginBottom: '16px' }}>
                                <input
                                    type="password"
                                    required
                                    style={{ width: '100%', padding: '12px 20px 12px 48px', borderRadius: '9999px', border: '1px solid #9ca3af', color: '#374151', fontSize: '12px', fontWeight: '500', letterSpacing: '0.05em', outline: 'none', boxSizing: 'border-box', height: '44px' }}
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#242b5c'}
                                    onBlur={(e) => e.target.style.borderColor = '#9ca3af'}
                                />
                                <Lock style={{ width: '16px', height: '16px', color: '#6b7280', position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{ width: '100%', backgroundColor: '#242b5c', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '9999px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '12px', height: '44px', marginTop: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', opacity: isLoading ? 0.7 : 1 }}
                            >
                                {isLoading ? '...' : 'LOGIN'}
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280', marginTop: '16px', width: '100%', padding: '0 4px', fontWeight: '500' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#242b5c' }}>
                                    <input type="checkbox" style={{ accentColor: '#242b5c', width: '12px', height: '12px' }} />
                                    Remember me
                                </label>
                                <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontStyle: 'italic' }}>Forgot your password?</a>
                            </div>
                        </form>
                    </div>

                    {/* Footer Dots */}
                    <div style={{ position: 'absolute', bottom: '40px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#242b5c' }}></div>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div style={{ width: '60%', position: 'relative', overflow: 'hidden', backgroundColor: '#1a237e' }}>
                    {/* Abstract Fluid Gradient Background */}
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Fluid Gradient"
                        style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                    />
                    <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(135deg, rgba(36,43,92,0.6), transparent, rgba(212,185,150,0.3))', mixBlendMode: 'overlay' }}></div>

                    {/* Top Navigation */}
                    <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '32px', padding: '40px 48px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>About</a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Download</a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Pricing</a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Contact</a>
                        <button style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: '9999px', padding: '6px 24px', color: 'white', background: 'transparent', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.15em' }}>
                            Sign In
                        </button>
                    </div>

                    {/* Welcome Text */}
                    <div style={{ position: 'absolute', bottom: '48px', right: '48px', textAlign: 'right', zIndex: 10 }}>
                        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '12px', letterSpacing: '0.025em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Welcome.</h1>
                        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '280px', fontSize: '10px', lineHeight: '1.6', marginLeft: 'auto' }}>
                            Access your real-time analytics dashboard to monitor performance, track KPIs, and grow your business.
                        </p>

                        <div style={{ marginTop: '24px', color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '500' }}>
                            Not a member? <a href="#" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', marginLeft: '4px' }}>Sign up now</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
