import React, { useState } from 'react';
import axios from 'axios';

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        message: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/volunteers', formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                skills: '',
                availability: '',
                message: '',
                password: '',
                confirmPassword: ''
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Frontend registration error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Register as Volunteer</h1>
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            Join our community of changemakers. Fill out the form below to get started.
                        </p>

                        {success && (
                            <div className="success-message">
                                ✅ Thank you for your interest! Your application has been submitted successfully.
                                We'll review it and get back to you soon.
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                ❌ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
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
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="text"
                                name="skills"
                                placeholder="Your Skills (e.g., Teaching, Marketing, IT)"
                                value={formData.skills}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="text"
                                name="availability"
                                placeholder="Availability (e.g., Weekends, Evenings)"
                                value={formData.availability}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            <textarea
                                name="message"
                                placeholder="How would you like to contribute?"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                            ></textarea>
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
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register Now'}
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

export default Volunteer;

