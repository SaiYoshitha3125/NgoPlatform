import React, { useState } from 'react';
import axios from 'axios';

const Donate = () => {
    const [formData, setFormData] = useState({
        donorName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/donations/register`, formData);
            setSuccess(true);
            setFormData({
                donorName: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                amount: ''
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Join as a Donor</h1>
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            Create your account to support our mission and track your impact.
                        </p>

                        {success && (
                            <div className="success-message">
                                ✅ Welcome! Your donor account has been created successfully.
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                ❌ {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="text"
                                    name="donorName"
                                    placeholder="Full Name"
                                    value={formData.donorName}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <textarea
                                name="address"
                                placeholder="Your Address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }}
                            />
                            <div style={{ borderTop: '1px solid #eee', marginTop: '1rem', paddingTop: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Initial Donation (Optional)</p>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Amount (₹)"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    min="0"
                                    style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{ marginTop: '1rem' }}
                            >
                                {loading ? 'Registering...' : 'Register & Support'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <style>{`
                .success-message {
                    background-color: #d4edda;
                    color: #155724;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    border: 1px solid #c3e6cb;
                    text-align: center;
                }

                .error-message {
                    background-color: #f8d7da;
                    color: #721c24;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    border: 1px solid #f5c6cb;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default Donate;

