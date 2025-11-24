import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

// This is the URL of the backend you created earlier
const API_URL = 'http://localhost:5000/api/v1/auth';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // We send a POST request to our /register endpoint
            const res = await axios.post(`${API_URL}/register`, formData);
            
            // If successful, show a success message
            setMessage('Registration successful! Please log in.');
            setIsError(false);
            setFormData({ username: '', email: '', password: '' }); // Clear the form
        } catch (err) {
            // If the API returns an error, we show it
            setMessage(err.response.data.message || 'Something went wrong');
            setIsError(true);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {message && <div className={`message ${isError ? 'error' : 'success'}`}>{message}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />
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
                    minLength="6"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
};

export default Register;