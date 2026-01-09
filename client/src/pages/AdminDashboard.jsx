import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaUserFriends, FaUserPlus, FaCertificate, FaHandHoldingHeart, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalMembers: 4,
        totalVolunteers: 0,
        totalDonations: 0,
        pendingVolunteers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Volunteers
                const volRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/volunteers`);
                const volunteers = volRes.data;
                const pending = volunteers.filter(v => v.status === 'Pending').length;

                // Fetch Donations
                const donRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/donations`);
                const donations = donRes.data;
                const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);

                setStats({
                    totalMembers: 4, // Placeholder as we don't have a fetch all users yet
                    totalVolunteers: volunteers.length,
                    totalDonations: totalDonationAmount,
                    pendingVolunteers: pending
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <DashboardLayout role="Admin">
            <div className="admin-dashboard">
                <div className="welcome-section">
                    <h1>Welcome back!</h1>
                    <p>Here's what's happening with your organization today.</p>
                </div>

                {/* Stats Cards Row */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon-wrapper" style={{ backgroundColor: '#e3f2fd' }}>
                            <FaUserFriends style={{ color: '#2196f3' }} />
                        </div>
                        <div className="stat-info">
                            <span className="trend positive">↗ +12%</span>
                            <p>Total Members</p>
                            <h3>{stats.totalMembers}</h3>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrapper" style={{ backgroundColor: '#e8f5e9' }}>
                            <FaUserPlus style={{ color: '#4caf50' }} />
                        </div>
                        <div className="stat-info">
                            <span className="trend positive">↗ +8%</span>
                            <p>Total Volunteers</p>
                            <h3>{stats.totalVolunteers}</h3>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrapper" style={{ backgroundColor: '#fff9c4' }}>
                            <FaCertificate style={{ color: '#fbc02d' }} />
                        </div>
                        <div className="stat-info">
                            <span className="trend positive">↗ +25%</span>
                            <p>Certificates Issued</p>
                            <h3>0</h3>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrapper" style={{ backgroundColor: '#ffebee' }}>
                            <FaHandHoldingHeart style={{ color: '#f44336' }} />
                        </div>
                        <div className="stat-info">
                            <span className="trend positive">↗ +15%</span>
                            <p>Donations</p>
                            <h3>₹{stats.totalDonations.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>

                {/* Second Row Widgets */}
                <div className="widgets-grid">
                    {/* Applications */}
                    <div className="widget-card">
                        <div className="widget-header">
                            <h3><FaChartLine style={{ color: '#ff9800' }} /> Applications</h3>
                        </div>
                        <div className="stat-row">
                            <span>Pending Review</span>
                            <span className="val warning">{stats.pendingVolunteers}</span>
                        </div>
                        <div className="stat-row">
                            <span>Approved</span>
                            <span className="val success">{stats.totalVolunteers - stats.pendingVolunteers}</span>
                        </div>
                        <div className="stat-row">
                            <span>Total Volunteers</span>
                            <span className="val">{stats.totalVolunteers}</span>
                        </div>
                    </div>

                    {/* Live Stats */}
                    <div className="widget-card">
                        <div className="widget-header">
                            <h3><FaChartLine style={{ color: '#2196f3' }} /> Live Stats</h3>
                        </div>
                        <div className="stat-row">
                            <span>Total Donations</span>
                            <span className="val success">₹{stats.totalDonations.toLocaleString()}</span>
                        </div>
                        <div className="stat-row">
                            <span>Certificates</span>
                            <span className="val warning">0</span>
                        </div>
                        <div className="stat-row">
                            <span>Volunteers</span>
                            <span className="val" style={{ color: '#9c27b0' }}>{stats.totalVolunteers}</span>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="widget-card">
                        <div className="widget-header">
                            <h3><FaCheckCircle style={{ color: '#4caf50' }} /> System Status</h3>
                        </div>
                        <div className="stat-row">
                            <span>Database</span>
                            <span className="status-badge online">Online</span>
                        </div>
                        <div className="stat-row">
                            <span>API Status</span>
                            <span className="status-badge healthy">Healthy</span>
                        </div>
                        <div className="stat-row">
                            <span>Last Backup</span>
                            <span className="val muted">2 hours ago</span>
                        </div>
                    </div>
                </div>

                {/* Charts Row Placeholder */}
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Monthly Registration Trends</h3>
                        <div className="chart-placeholder">
                            {/* Chart.js or Recharts would go here */}
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar" style={{ height: '60%' }}></div>
                            <div className="bar" style={{ height: '30%' }}></div>
                            <div className="bar" style={{ height: '80%' }}></div>
                            <div className="bar" style={{ height: '50%' }}></div>
                        </div>
                    </div>
                    <div className="chart-card">
                        <h3>Donation Distribution</h3>
                        <div className="chart-placeholder circle">
                            {/* Pie chart placeholder */}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .welcome-section {
                    margin-bottom: 2rem;
                }
                .welcome-section h1 {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                     box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                 .stat-icon-wrapper {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.3rem;
                }

                .stat-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .trend {
                    align-self: flex-end;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                .trend.positive { color: #4caf50; }

                .stat-info p {
                    margin: 0;
                    color: #636e72;
                    font-size: 0.9rem;
                }
                .stat-info h3 {
                    margin: 5px 0 0 0;
                    font-size: 1.5rem;
                }

                .widgets-grid {
                     display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .widget-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                     box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .widget-header h3 {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 0;
                    font-size: 1.1rem;
                    color: #2d3436;
                    margin-bottom: 1.5rem;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.8rem 0;
                    border-bottom: 1px solid #f1f2f6;
                    font-size: 0.95rem;
                }
                .stat-row:last-child {
                    border-bottom: none;
                }

                .val.warning { color: #f39c12; font-weight: bold; }
                .val.success { color: #2ecc71; font-weight: bold; }
                .val.muted { color: #b2bec3; }

                .status-badge {
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .status-badge.online { background: #e8f5e9; color: #2ecc71; }
                .status-badge.healthy { background: #e8f5e9; color: #2ecc71; }

                .charts-grid {
                     display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1.5rem;
                }
                
                .chart-card {
                     background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                     box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
                
                .chart-placeholder {
                    height: 200px;
                    background: #fafafa;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-around;
                    padding: 10px;
                }
                .bar {
                    width: 30px;
                    background: #e0e0e0;
                    border-radius: 5px 5px 0 0;
                }
                .chart-placeholder.circle {
                     align-items: center;
                     justify-content: center;
                }
                
                /* Helper component for missing icon */
                const FaFileAltIcon = () => <FaChartLine style={{color: '#ff9800'}} /> // Placeholder
            `}</style>
        </DashboardLayout>
    );
};

// Helper for the missing icon usage
const FaFileAltIcon = () => <FaChartLine style={{ color: '#ff9800' }} />;

export default AdminDashboard;
