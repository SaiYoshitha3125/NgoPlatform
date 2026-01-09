import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Dedicated to providing sustainable healthcare solutions to underprivileged communities worldwide.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/mission">Our Mission</Link></li>
                        <li><Link to="/team">Our Team</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: info@healthcarengo.org</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Care Lane, Humanity City</p>
                </div>
                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email" />
                        <button className="btn btn-primary">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 HealthCare NGO. All rights reserved.</p>
            </div>

            <style>{`
                .footer {
                    background-color: #1a252f;
                    color: var(--text-light);
                    padding: 4rem 0 0;
                    margin-top: auto;
                }
                .footer-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    padding-bottom: 3rem;
                }
                .footer-section h3 {
                    color: var(--secondary);
                    margin-bottom: 1.5rem;
                    font-size: 1.2rem;
                }
                .footer-section p {
                    color: #bdc3c7;
                    line-height: 1.6;
                    margin-bottom: 0.5rem;
                }
                .footer-section ul {
                    list-style: none;
                }
                .footer-section ul li {
                    margin-bottom: 0.8rem;
                }
                .footer-section ul li a {
                    color: #bdc3c7;
                    transition: var(--transition);
                }
                .footer-section ul li a:hover {
                    color: var(--secondary);
                    padding-left: 5px;
                }
                .newsletter-form {
                    display: flex;
                    gap: 0.5rem;
                }
                .newsletter-form input {
                    padding: 0.5rem;
                    border: none;
                    border-radius: 4px;
                    width: 100%;
                }
                .footer-bottom {
                    background-color: #161e27;
                    text-align: center;
                    padding: 1.5rem 0;
                    margin-top: 2rem;
                    color: #7f8c8d;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
