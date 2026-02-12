import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            fontFamily: "'Inter', system-ui, sans-serif",
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
