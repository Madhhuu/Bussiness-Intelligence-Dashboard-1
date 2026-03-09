import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AuthContext from '../../context/AuthContext';

const Layout = () => {
    const { isDarkMode, accentColor } = useContext(AuthContext);

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
            color: isDarkMode ? '#f8fafc' : '#1e293b',
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: 'all 0.3s ease'
        }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Navbar />
                <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
