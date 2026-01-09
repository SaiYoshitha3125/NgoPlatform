import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, formData);
            localStorage.setItem('auth-token', res.data.token);
            const userRole = res.data.user.role;
            localStorage.setItem('user-role', userRole);

            switch (userRole) {
                case 'Member':
                    navigate('/member-dashboard');
                    break;
                case 'Volunteer':
                    navigate('/volunteer-dashboard');
                    break;
                case 'Donor':
                    navigate('/donor-dashboard');
                    break;
                case 'Beneficiary':
                    navigate('/beneficiary-dashboard');
                    break;
                case 'Admin':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="role">I am a...</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Member">Member</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Donor">Donor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <p className="auth-redirect">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>

            <style>{`
                .auth-container {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--bg-light);
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                    background-image: 
                        radial-gradient(circle at 20% 30%, rgba(142, 68, 173, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(241, 196, 15, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(26, 188, 156, 0.05) 0%, transparent 50%);
                }
                .auth-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        radial-gradient(circle, rgba(142, 68, 173, 0.15) 1px, transparent 1px);
                    background-size: 30px 30px;
                    opacity: 0.4;
                    pointer-events: none;
                }
                .auth-container::after {
                    content: '';
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(241, 196, 15, 0.1) 0%, transparent 70%);
                    top: -200px;
                    right: -200px;
                    pointer-events: none;
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, 20px) scale(1.1); }
                }
                .auth-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    width: 100%;
                    max-width: 400px;
                    position: relative;
                    z-index: 1;
                }
                .auth-card h2 {
                    text-align: center;
                    margin-bottom: 2rem;
                    color: var(--primary);
                }
                .form-group {
                    margin-bottom: 1.25rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--text-dark);
                }
                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                    background-color: #fff;
                }
                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: var(--secondary);
                }
                .btn-block {
                    width: 100%;
                    margin-top: 1rem;
                }
                .auth-redirect {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.9rem;
                }
                .auth-redirect a {
                    color: var(--secondary);
                    font-weight: 600;
                }
                .error-message {
                    background-color: #fee2e2;
                    color: #b91c1c;
                    padding: 0.75rem;
                    border-radius: 5px;
                    margin-bottom: 1rem;
                    text-align: center;
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
};

export default Login;
