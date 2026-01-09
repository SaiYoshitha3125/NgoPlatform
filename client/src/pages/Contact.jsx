import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for submission logic
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="page-container">
            <section className="section bg-light">
                <div className="container contact-container">
                    <div className="contact-info">
                        <h1 className="section-title" style={{ textAlign: 'left' }}>Get In Touch</h1>
                        <p>Have questions or want to get involved? We'd love to hear from you.</p>

                        <div className="info-item">
                            <h3>Address</h3>
                            <p>123 Care Lane, Humanity City, HC 54321</p>
                        </div>
                        <div className="info-item">
                            <h3>Email</h3>
                            <p>info@healthcarengo.org</p>
                        </div>
                        <div className="info-item">
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
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
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
            <style>{`
                .contact-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                }
                .contact-info .section-title::after {
                    margin: 1rem 0 0;
                }
                .info-item {
                    margin-bottom: 2rem;
                }
                .info-item h3 {
                    color: var(--primary);
                    margin-bottom: 0.5rem;
                }
                .contact-form-container {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--text-dark);
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: var(--transition);
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--secondary);
                }
                @media (max-width: 768px) {
                    .contact-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;
