import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import our context

const API_URL = 'http://localhost:5000/api/v1/auth';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext); // Get the login function from context
    const navigate = useNavigate(); // Hook for redirection

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const res = await axios.post(`${API_URL}/login`, formData);
            
            // Use our context to save the token
            login(res.data.token);

            // Redirect to the dashboard
            navigate('/dashboard');

        } catch (err) {
            setError(err.response.data.message || 'Something went wrong');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div className="message error">{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Don't have an account? Register</Link>
        </div>
    );
};

export default Login;