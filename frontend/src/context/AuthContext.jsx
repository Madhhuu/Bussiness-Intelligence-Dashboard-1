import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Appearance States
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem('isDarkMode');
        return stored === 'true';
    });
    const [accentColor, setAccentColor] = useState(() => {
        return localStorage.getItem('accentColor') || '#3b82f6';
    });
    const [layoutDensity, setLayoutDensity] = useState(() => {
        return localStorage.getItem('layoutDensity') || 'Comfortable';
    });

    useEffect(() => {
        localStorage.setItem('isDarkMode', isDarkMode);
        // Apply dark mode to body for fundamental bg shifts
        document.body.style.backgroundColor = isDarkMode ? '#0f172a' : '#f1f5f9';
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    useEffect(() => {
        localStorage.setItem('layoutDensity', layoutDensity);
    }, [layoutDensity]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error('Error parsing stored user:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user, setUser, login, logout, loading,
            searchQuery, setSearchQuery,
            isDarkMode, setIsDarkMode,
            accentColor, setAccentColor,
            layoutDensity, setLayoutDensity
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
