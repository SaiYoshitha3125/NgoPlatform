import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Check if user is logged in (placeholder logic, will be updated with context/state)
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('user-role');

    let dashboardPath = '/';
    if (role === 'Member') dashboardPath = '/member-dashboard';
    else if (role === 'Volunteer') dashboardPath = '/volunteer-dashboard';
    else if (role === 'Donor') dashboardPath = '/donor-dashboard';
    else if (role === 'Admin') dashboardPath = '/admin-dashboard';

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-role');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    Orbosis <span className="logo-accent">Foundation</span>
                </Link>

                <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/#" onClick={toggleMenu}>Home</Link>
                    <Link to="/#about" onClick={toggleMenu}>About Us</Link>
                    <Link to="/#mission" onClick={toggleMenu}>Mission</Link>
                    <Link to="/#team" onClick={toggleMenu}>Our Team</Link>
                    <Link to="/#gallery" onClick={toggleMenu}>Gallery</Link>
                    <Link to="/#contact" onClick={toggleMenu}>Contact</Link>

                    {token ? (
                        <>
                            <Link to={dashboardPath} onClick={toggleMenu} className="btn btn-outline btn-sm" style={{ border: 'none', paddingLeft: 0 }}>Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-outline btn-sm" onClick={toggleMenu}> Login </Link>
                            <Link to="/signup" className="btn btn-primary btn-sm" onClick={toggleMenu}> Sign Up </Link>
                        </div>
                    )}
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>

            <style>{`
                .navbar {
                    background-color: var(--primary);
                    color: white;
                    padding: 1rem 0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-shadow: var(--shadow);
                }
                .navbar-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .navbar-logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                }
                .logo-accent {
                    color: var(--secondary);
                }
                .navbar-links {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }
                .navbar-links a {
                    font-weight: 500;
                    transition: var(--transition);
                    opacity: 0.9;
                }
                .navbar-links a:hover {
                    color: var(--secondary);
                    opacity: 1;
                }
                .btn-sm {
                    padding: 0.4rem 1rem;
                    font-size: 0.9rem;
                    margin-left: 0.5rem;
                }
                .auth-buttons {
                    display: flex;
                    gap: 0.5rem;
                }
                .menu-icon {
                    display: none;
                    cursor: pointer;
                    flex-direction: column;
                    gap: 5px;
                }
                .bar {
                    width: 25px;
                    height: 3px;
                    background-color: white;
                    transition: var(--transition);
                }

                @media (max-width: 768px) {
                    .menu-icon {
                        display: flex;
                    }
                    .navbar-links {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background-color: var(--primary);
                        flex-direction: column;
                        padding: 1rem;
                        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
                        transition: var(--transition);
                    }
                    .navbar-links.active {
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                    .auth-buttons {
                        flex-direction: column;
                        width: 100%;
                        align-items: center;
                    }
                    .btn-sm {
                        margin: 0.5rem 0;
                        display: block;
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
