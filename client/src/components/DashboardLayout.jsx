import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  FaChartBar,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

const DashboardLayout = ({ children, role, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initial state: closed on mobile, open on desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);

  // Auto-close sidebar on window resize ONLY when crossing the 900px threshold
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (window.innerWidth <= 900) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-role");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const sidebarLinks = {
    Volunteer: [
      { name: "Home", path: "/", icon: <FaHome /> },
      { name: "Dashboard", path: "/volunteer-dashboard", icon: <FaThLarge /> },
      { name: "My Tasks", path: "/volunteer-tasks", icon: <FaTasks /> },
      { name: "My Profile", path: "/volunteer-profile", icon: <FaUser /> },
      { name: "Events", path: "/volunteer-events", icon: <FaCalendarAlt /> },
    ],

    Admin: [
      { name: "Home", path: "/", icon: <FaHome /> },
      { name: "Dashboard", path: "/admin-dashboard", icon: <FaThLarge /> },
      { name: "Volunteer", path: "/admin-volunteers", icon: <FaUser /> },
      { name: "Member", path: "/admin-members", icon: <FaUsers /> },
      {
        name: "Donations",
        path: "/admin-donations",
        icon: <FaHandHoldingHeart />,
      },
    ],

    Member: [
      { name: "Home", path: "/", icon: <FaHome /> },
      { name: "Dashboard", path: "/member-dashboard", icon: <FaThLarge /> },
    ],

    Donor: [
      { name: "Home", path: "/", icon: <FaHome /> },
      { name: "Dashboard", path: "/donor-dashboard", icon: <FaThLarge /> },
      {
        name: "My Donations",
        path: "/donor-donations",
        icon: <FaHandHoldingHeart />,
      },
      { name: "Impact Report", path: "/donor-impact", icon: <FaChartBar /> },
      { name: "Profile", path: "/donor-profile", icon: <FaUser /> },
    ],

    Beneficiary: [
      { name: "Home", path: "/", icon: <FaHome /> },
      {
        name: "Dashboard",
        path: "/beneficiary-dashboard",
        icon: <FaThLarge />,
      },
    ],
  };

  const links = sidebarLinks[role] || sidebarLinks["Member"];

  // Debug: Ensure role is correct
  console.log("DashboardLayout Role:", role);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <button className="mobile-close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="sidebar-nav">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className={`main-wrapper ${!isSidebarOpen ? "full-width" : ""}`}>
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <div>
              <h2>Dashboard</h2>
              <p className="welcome-sub">Welcome back, {userName || "User"}!</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="content-area">{children}</main>
      </div>

      <style>{`
                :root {
                    --sidebar-width: 250px;
                    --topbar-height: 80px;
                    --bg-main: #f8f9fa;
                    --primary-color: #6c5ce7;
                    --text-color: #333;
                    --muted-text: #666;
                }

                .dashboard-layout {
                    display: flex;
                    min-height: 100vh;
                    background-color: var(--bg-main);
                    font-family: 'Outfit', sans-serif;
                }

                /* Mobile Overlay */
                .sidebar-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    backdrop-filter: blur(2px);
                }
                
                @media (max-width: 900px) {
                    .sidebar-overlay {
                        display: block;
                    }
                    .sidebar-overlay.active {
                        opacity: 1;
                        pointer-events: auto;
                    }
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
                    z-index: 1001;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    left: 0;
                    top: 0;
                }
                
                @media (max-width: 900px) {
                    .sidebar {
                        transform: translateX(-100%);
                    }
                    .sidebar.open {
                        transform: translateX(0);
                        box-shadow: 4px 0 15px rgba(0,0,0,0.1);
                    }
                }
                
                @media (min-width: 901px) {
                    .sidebar.collapsed {
                        transform: translateX(-100%);
                    }
                    .sidebar.open {
                        transform: translateX(0);
                    }
                }

                .sidebar-header {
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                    min-height: 60px;
                    align-items: center;
                }

                .mobile-close-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    cursor: pointer;
                    padding: 0.5rem;
                    display: none;
                }
                
                @media (max-width: 900px) {
                    .mobile-close-btn {
                        display: block;
                    }
                }

                .sidebar-nav {
                    padding: 1rem;
                    flex: 1;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
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
                    background-color: #e0dcfc;
                    color: var(--primary-color);
                    font-weight: 600;
                }

                .nav-icon {
                    margin-right: 12px;
                    font-size: 1.25rem;
                    min-width: 25px;
                    display: flex;
                    justify-content: center;
                }

                /* Main Wrapper */
                .main-wrapper {
                    flex: 1;
                    margin-left: var(--sidebar-width);
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    transition: margin-left 0.3s ease;
                }
                
                .main-wrapper.full-width {
                    margin-left: 0;
                }
                
                @media (max-width: 900px) {
                    .main-wrapper {
                        margin-left: 0 !important;
                    }
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
                    position: sticky;
                    top: 0;
                    z-index: 900;
                }

                .topbar-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .menu-toggle-btn {
                    background: none;
                    border: none;
                    font-size: 1.6rem;
                    color: var(--text-color);
                    cursor: pointer;
                    padding: 0.5rem;
                    display: block;
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

                /* Content Area */
                .content-area {
                    padding: 2rem;
                    flex: 1;
                    overflow-x: hidden;
                    width: 100%;
                }

                @media (max-width: 480px) {
                    :root {
                        --topbar-height: 70px;
                    }

                    .topbar {
                        padding: 0 1rem;
                    }

                    .topbar-left h2 {
                        font-size: 1.2rem;
                    }

                    .welcome-sub {
                        font-size: 0.8rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 150px;
                    }

                    .content-area {
                        padding: 1rem;
                    }

                    .sidebar {
                        width: 80%;
                        max-width: 300px;
                    }
                }
            `}</style>
    </div>
  );
};

export default DashboardLayout;