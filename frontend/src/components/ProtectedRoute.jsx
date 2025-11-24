import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        // If user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child components (e.g., the Dashboard)
    return children;
};

export default ProtectedRoute;