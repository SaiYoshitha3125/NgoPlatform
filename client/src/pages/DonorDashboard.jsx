import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { FaHandHoldingHeart, FaUser, FaHistory, FaBullseye, FaArrowRight, FaChartBar, FaGlobe } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DonorDashboard = () => {
    const location = useLocation();
    const [activeView, setActiveView] = useState('overview');
    const [data, setData] = useState({
        profile: {},
        totalDonated: 0,
        donationHistory: [],
        supportedWorks: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) return; // Handle no token case if needed

                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/donations/me/dashboard`, {
                    headers: { 'auth-token': token }
                });
                setData(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching donor dashboard:', err);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    useEffect(() => {
        const path = location.pathname;
        if (path === '/donor-donations') setActiveView('donations');
        else if (path === '/donor-impact') setActiveView('impact');
        else if (path === '/donor-profile') setActiveView('profile');
        else setActiveView('overview');
    }, [location.pathname]);

    const renderOverview = () => (
        <div className="donor-dashboard">
            <header className="page-header">
                <h1>My Impact Dashboard</h1>
                <p>Thank you for being a part of our mission, {data.profile.name}!</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card total-donation">
                    <div className="stat-icon">
                        <FaHandHoldingHeart />
                    </div>
                    <div className="stat-info">
                        <h3>₹{data.totalDonated.toLocaleString()}</h3>
                        <p>Total Contribution</p>
                    </div>
                </div>
                <div className="stat-card donor-profile">
                    <div className="stat-icon">
                        <FaUser />
                    </div>
                    <div className="stat-info">
                        <h3>{data.profile.email}</h3>
                        <p>{data.profile.phone || 'No phone added'}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <section className="dashboard-section supported-works">
                    <div className="section-header">
                        <FaBullseye />
                        <h2>Works You Support</h2>
                    </div>
                    <div className="works-list">
                        {data.supportedWorks && data.supportedWorks.length > 0 ? (
                            data.supportedWorks.map((work) => (
                                <div key={work.id} className="work-item">
                                    <div className="work-dot"></div>
                                    <div className="work-content">
                                        <h4>{work.title}</h4>
                                        <p>{work.impact}</p>
                                    </div>
                                    <FaArrowRight className="arrow" />
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#888', fontStyle: 'italic' }}>Your contributions help us allocate resources where they are needed most.</p>
                        )}
                    </div>
                </section>

                <section className="dashboard-section donation-history">
                    <div className="section-header">
                        <FaHistory />
                        <h2>Recent Donations</h2>
                    </div>
                    <div className="history-table-wrapper">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.donationHistory.length > 0 ? (
                                    data.donationHistory.slice(0, 5).map((donation) => (
                                        <tr key={donation._id}>
                                            <td>{new Date(donation.date).toLocaleDateString()}</td>
                                            <td className="amount">₹{donation.amount}</td>
                                            <td><span className={`status ${donation.status.toLowerCase()}`}>{donation.status}</span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                            No donations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );

    const renderDonations = () => (
        <div className="donor-donations-view">
            <header className="page-header">
                <h1>My Donations</h1>
                <p>A complete history of your generous contributions</p>
            </header>

            <div className="dashboard-section">
                <div className="history-table-wrapper">
                    <table className="history-table full-width">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.donationHistory.length > 0 ? (
                                data.donationHistory.map((donation) => (
                                    <tr key={donation._id}>
                                        <td>{new Date(donation.date).toLocaleDateString()} {new Date(donation.date).toLocaleTimeString()}</td>
                                        <td><span className="tx-id">{donation._id.substring(0, 8)}...</span></td>
                                        <td className="amount">₹{donation.amount}</td>
                                        <td>{donation.paymentMethod || 'Online'}</td>
                                        <td><span className={`status ${donation.status.toLowerCase()}`}>{donation.status}</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                                        No donations found in your history.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderImpact = () => {
        // Group donations by month for the graph
        const chartData = data.donationHistory.reduce((acc, donation) => {
            const date = new Date(donation.date);
            const month = date.toLocaleString('default', { month: 'short' });
            const existing = acc.find(item => item.name === month);
            if (existing) {
                existing.amount += donation.amount;
            } else {
                acc.push({ name: month, amount: donation.amount });
            }
            return acc;
        }, []).reverse();

        return (
            <div className="donor-impact-view">
                <header className="page-header">
                    <h1>Impact Report</h1>
                    <p>See the tangible difference your support is making</p>
                </header>

                <div className="impact-grid">
                    <div className="impact-card">
                        <FaGlobe className="impact-icon" />
                        <h3>Global Reach</h3>
                        <p>Your donations have helped support initiatives in <strong>3 regions</strong> across the country.</p>
                    </div>
                    <div className="impact-card">
                        <FaUser className="impact-icon" />
                        <h3>Lives Touched</h3>
                        <p>Estimated <strong>{(data.totalDonated / 500).toFixed(0)} lives</strong> impacted through direct aid and support programs.</p>
                    </div>
                    <div className="impact-card">
                        <FaChartBar className="impact-icon" />
                        <h3>Efficiency</h3>
                        <p><strong>95%</strong> of your donation goes directly to the field, ensuring maximum impact.</p>
                    </div>
                </div>

                <div className="dashboard-section chart-section" style={{ marginTop: '2rem' }}>
                    <div className="section-header">
                        <FaChartBar />
                        <h2>Donation Trend</h2>
                    </div>
                    <div className="chart-container" style={{ width: '100%', height: 300 }}>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#636e72' }} />
                                    <YAxis hide={window.innerWidth < 480} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#636e72' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f1f2f6' }}
                                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="amount" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Not enough data to show trends.</p>
                        )}
                    </div>
                </div>

                <section className="dashboard-section" style={{ marginTop: '2rem' }}>
                    <div className="section-header">
                        <FaBullseye />
                        <h2>Project Highlights</h2>
                    </div>
                    <p className="highlight-text">
                        Thanks to donors like you, we've able to fund critical projects this year including
                        clean water initiatives, education supplies for underfunded schools, and emergency
                        medical relief camps. Your consistency allows us to plan for long-term sustainable change.
                    </p>
                </section>
            </div>
        );
    };

    const renderProfile = () => (
        <div className="donor-profile-view">
            <header className="page-header">
                <h1>My Profile</h1>
                <p>Manage your account settings</p>
            </header>

            <div className="dashboard-section profile-details">
                <div className="profile-row">
                    <label>Name</label>
                    <div>{data.profile.name}</div>
                </div>
                <div className="profile-row">
                    <label>Email</label>
                    <div>{data.profile.email}</div>
                </div>
                <div className="profile-row">
                    <label>Phone</label>
                    <div>{data.profile.phone || 'Not provided'}</div>
                </div>
                <div className="profile-row">
                    <label>Member Since</label>
                    <div>{new Date(data.profile.createdAt || Date.now()).toLocaleDateString()}</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <button className="btn-edit" onClick={() => alert('Profile editing coming soon!')}>Edit Profile</button>
                </div>
            </div>
        </div>
    );

    if (loading) return (
        <DashboardLayout role="Donor" userName="Donor">
            <div className="loading-state">Loading your dashboard...</div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout role="Donor" userName={data.profile.name}>
            {activeView === 'overview' && renderOverview()}
            {activeView === 'donations' && renderDonations()}
            {activeView === 'impact' && renderImpact()}
            {activeView === 'profile' && renderProfile()}

            <style>{`
                .donor-dashboard, .donor-donations-view, .donor-impact-view, .donor-profile-view {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding-bottom: 3rem;
                }
                .loading-state {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 60vh;
                    font-size: 1.2rem;
                    color: #666;
                }
                .page-header {
                    margin-bottom: 2.5rem;
                }
                .page-header h1 {
                    font-size: clamp(1.5rem, 5vw, 2.2rem);
                    color: #2d3436;
                    margin-bottom: 0.5rem;
                }
                .page-header p {
                    color: #636e72;
                    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }
                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    border: 1px solid #f1f2f6;
                }
                .stat-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }
                .donor-profile .stat-info h3 {
                    font-size: 1.1rem;
                    font-family: 'Inter', 'Outfit', sans-serif;
                    letter-spacing: -0.01em;
                    color: #4b4b4b;
                    font-weight: 500;
                }
                .stat-info h3 { font-size: 1.4rem; margin: 0; color: #2d3436; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .stat-info p { margin: 0; color: #636e72; font-size: 0.85rem; }

                /* Dashboard Grid */
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 2rem;
                }

                .dashboard-section {
                    background: white;
                    border-radius: 15px;
                    padding: clamp(1.2rem, 3vw, 2rem);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    border: 1px solid #f1f2f6;
                }
                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    margin-bottom: 1.5rem;
                    color: #6c5ce7;
                }
                .section-header h2 { font-size: 1.2rem; margin: 0; color: #2d3436; }

                /* Works List */
                .works-list { display: flex; flex-direction: column; gap: 1rem; }
                .work-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 10px;
                    background: #f9f9f9;
                    transition: all 0.2s;
                }
                .work-item:hover { transform: translateX(5px); background: #f1f2f6; }
                .work-dot { width: 8px; height: 8px; border-radius: 50%; background: #6c5ce7; flex-shrink: 0; }
                .work-content { flex: 1; overflow: hidden; }
                .work-content h4 { margin: 0; font-size: 0.95rem; color: #2d3436; }
                .work-content p { margin: 0.2rem 0 0; font-size: 0.8rem; color: #636e72; }
                .arrow { color: #dfe6e9; font-size: 0.8rem; flex-shrink: 0; }

                /* Tables */
                .history-table-wrapper { 
                    margin: 0 -1.2rem;
                    padding: 0 1.2rem;
                    overflow-x: auto; 
                }
                .history-table { width: 100%; border-collapse: collapse; min-width: 400px; }
                .history-table th {
                    text-align: left;
                    padding: 1rem 0.5rem;
                    font-size: 0.8rem;
                    color: #636e72;
                    border-bottom: 2px solid #f1f2f6;
                    font-weight: 600;
                }
                .history-table td {
                    padding: 1rem 0.5rem;
                    border-bottom: 1px solid #f1f2f6;
                    font-size: 0.85rem;
                }
                .amount { font-weight: 600; color: #2d3436; }
                .tx-id { font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 4px; font-size: 0.75rem; }
                
                .status {
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }
                .status.completed { background: #d4edda; color: #155724; }
                .status.pending { background: #fff3cd; color: #856404; }
                .status.failed { background: #f8d7da; color: #721c24; }

                /* Impact Grid */
                .impact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1.5rem;
                }
                .impact-card {
                    background: white;
                    padding: 2rem 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    border: 1px solid #f1f2f6;
                }
                .impact-icon { font-size: 2.2rem; color: #6c5ce7; margin-bottom: 1rem; }
                .impact-card h3 { font-size: 1.2rem; color: #2d3436; margin-bottom: 0.8rem; }
                .impact-card p { font-size: 0.9rem; color: #636e72; line-height: 1.6; }

                /* Chart */
                .chart-container {
                    margin-top: 1rem;
                }

                /* Highlights */
                .highlight-text {
                    color: #666;
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                /* Profile */
                .profile-details { max-width: 600px; }
                .profile-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 1rem 0;
                    border-bottom: 1px solid #eee;
                    font-size: 0.95rem;
                }
                .profile-row label { font-weight: 600; color: #636e72; }
                .profile-row div { 
                    font-family: 'Inter', 'Outfit', sans-serif;
                    color: #4b4b4b;
                    font-weight: 500;
                }
                .btn-edit {
                    background: #6c5ce7;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    width: 100%;
                }

                @media (max-width: 600px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .page-header { margin-bottom: 1.5rem; }
                    .impact-grid { grid-template-columns: 1fr; }
                    .profile-row { flex-direction: column; gap: 0.5rem; }
                    .profile-row div { font-weight: 500; }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default DonorDashboard;
