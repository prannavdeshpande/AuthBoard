import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token')); // Load token from localStorage on initial load

    // This effect runs whenever the token changes
    useEffect(() => {
        if (token) {
            // If there's a token, store it in localStorage
            localStorage.setItem('token', token);
        } else {
            // If there's no token (e.g., on logout), remove it
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    // The value provided to consuming components
    const value = {
        token,
        isAuthenticated: !!token, // A simple boolean to check if user is logged in
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};