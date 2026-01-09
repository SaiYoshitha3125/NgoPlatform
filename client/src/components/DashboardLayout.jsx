import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    FaThLarge,
    FaUser,
    FaCalendarAlt,
    FaTasks,
    FaSignOutAlt,
    FaSearch,
    FaBell,
    FaUsers,
    FaFileAlt,
    FaHandHoldingHeart,
    FaImages,
    FaCertificate,
    FaChartBar
} from 'react-icons/fa';

const DashboardLayout = ({ children, role, userName }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-role');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const sidebarLinks = {
        Volunteer: [
            { name: 'Dashboard', path: '/volunteer-dashboard', icon: <FaThLarge /> },
            { name: 'My Tasks', path: '/volunteer-tasks', icon: <FaTasks /> },

            { name: 'My Profile', path: '/volunteer-profile', icon: <FaUser /> },
            { name: 'Events', path: '/volunteer-events', icon: <FaCalendarAlt /> },
        ],
        Admin: [
            { name: 'Home', path: '/', icon: <FaThLarge /> },
            { name: 'Dashboard', path: '/admin-dashboard', icon: <FaThLarge /> },
            { name: 'Volunteer', path: '/admin-volunteers', icon: <FaUser /> },
            { name: 'Member', path: '/admin-members', icon: <FaUsers /> },
            { name: 'Applications', path: '/admin-applications', icon: <FaFileAlt /> },
            { name: 'Donations', path: '/admin-donations', icon: <FaHandHoldingHeart /> },
        ],
        // Default fallbacks for other roles can be added here
        Member: [
            { name: 'Home', path: '/', icon: <FaThLarge /> },
            { name: 'Dashboard', path: '/member-dashboard', icon: <FaThLarge /> },
        ],
        Donor: [
            { name: 'Dashboard', path: '/donor-dashboard', icon: <FaThLarge /> },
            { name: 'My Donations', path: '/donor-donations', icon: <FaHandHoldingHeart /> },
            { name: 'Impact Report', path: '/donor-impact', icon: <FaChartBar /> },
            { name: 'Profile', path: '/donor-profile', icon: <FaUser /> },
        ],
        Beneficiary: [
            { name: 'Home', path: '/', icon: <FaThLarge /> },
            { name: 'Dashboard', path: '/beneficiary-dashboard', icon: <FaThLarge /> },
        ]
    };

    const links = sidebarLinks[role] || sidebarLinks['Member']; // Default to Member if role not found or generic
    // Debug: Ensure role is correct
    console.log('DashboardLayout Role:', role);

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    {/* Logo removed as requested */}
                </div>
                <nav className="sidebar-nav">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{link.icon}</span>
                            <span className="nav-text">{link.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    {/* Optional footer content */}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="main-wrapper">
                {/* Topbar */}
                <header className="topbar">
                    <div className="topbar-left">
                        <h2>Dashboard</h2>
                        <p className="welcome-sub">Welcome back, {userName || 'User'}!</p>
                    </div>
                    <div className="topbar-right">
                        {role !== 'Volunteer' && (
                            <button onClick={handleLogout} className="btn-logout" title="Logout">
                                Logout
                            </button>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="content-area">
                    {children}
                </main>
            </div>

            <style>{`
                :root {
                   --sidebar-width: 250px;
                   --topbar-height: 80px;
                   --bg-main: #f8f9fa;
                   --primary-color: #6c5ce7; /* Example purple from image */
                   --text-color: #333;
                   --muted-text: #666;
                }

                .dashboard-layout {
                    display: flex;
                    min-height: 100vh;
                    background-color: var(--bg-main);
                    font-family: 'Segoe UI', sans-serif;
                }

                /* Sidebar Styles */
                .sidebar {
                    width: var(--sidebar-width);
                    background-color: white;
                    border-right: 1px solid #eee;
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    height: 100vh;
                    z-index: 100;
                }

                .sidebar-header {
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .sidebar-logo {
                    text-decoration: none;
                    text-align: center;
                }

                .logo-text {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #4834d4; /* Deep purple */
                    display: block;
                }
                .logo-sub {
                    font-size: 0.8rem;
                    color: #666;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .sidebar-nav {
                    padding: 1rem;
                    flex: 1;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 0.8rem 1rem;
                    text-decoration: none;
                    color: var(--text-color);
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                    transition: all 0.2s;
                    font-weight: 500;
                }

                .nav-link:hover {
                    background-color: #f0f0f0;
                }

                .nav-link.active {
                    background-color: #e0dcfc; /* Light purple bg */
                    color: var(--primary-color);
                    font-weight: 600;
                }

                .nav-icon {
                    margin-right: 12px;
                    font-size: 1.1rem;
                    display: flex;
                }

                /* Main Wrapper */
                .main-wrapper {
                    flex: 1;
                    margin-left: var(--sidebar-width);
                    display: flex;
                    flex-direction: column;
                }

                /* Topbar */
                .topbar {
                    height: var(--topbar-height);
                    background: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2rem;
                    border-bottom: 1px solid #eee;
                }

                .topbar-left h2 {
                    margin: 0;
                    font-size: 1.5rem;
                }

                .welcome-sub {
                    margin: 0;
                    color: var(--muted-text);
                    font-size: 0.9rem;
                }

                .topbar-right {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .search-bar {
                    position: relative;
                    background: #f1f2f6;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    width: 250px;
                }

                .search-icon {
                    color: #999;
                    margin-right: 0.5rem;
                }

                .search-bar input {
                    border: none;
                    background: transparent;
                    outline: none;
                    width: 100%;
                }

                .notification-icon {
                    position: relative;
                    font-size: 1.2rem;
                    color: var(--muted-text);
                    cursor: pointer;
                }

                .badge {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4757;
                    color: white;
                    font-size: 0.7rem;
                    border-radius: 50%;
                    padding: 2px 5px;
                }

                .btn-logout {
                    background: #ff4757;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.2s;
                }
                .btn-logout:hover {
                    background: #ff6b81;
                }
            /* Content Area */
                .content-area {
                    padding: 2rem;
                    flex: 1;
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;
