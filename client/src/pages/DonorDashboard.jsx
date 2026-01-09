import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import { FaHandHoldingHeart, FaUser, FaHistory, FaBullseye, FaArrowRight } from 'react-icons/fa';

const DonorDashboard = () => {
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
                const res = await axios.get('http://localhost:5000/api/donations/me/dashboard', {
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

    if (loading) return (
        <DashboardLayout role="Donor" userName="Donor">
            <div className="loading-state">Loading your dashboard...</div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout role="Donor" userName={data.profile.name}>
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
                            {data.supportedWorks.map((work) => (
                                <div key={work.id} className="work-item">
                                    <div className="work-dot"></div>
                                    <div className="work-content">
                                        <h4>{work.title}</h4>
                                        <p>{work.impact}</p>
                                    </div>
                                    <FaArrowRight className="arrow" />
                                </div>
                            ))}
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

                <style>{`
                    .donor-dashboard {
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
                        font-size: 2.2rem;
                        color: #2d3436;
                        margin-bottom: 0.5rem;
                    }
                    .page-header p {
                        color: #636e72;
                        font-size: 1.1rem;
                    }

                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 1.5rem;
                        margin-bottom: 2.5rem;
                    }
                    .stat-card {
                        background: white;
                        padding: 1.5rem 2rem;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                        border: 1px solid #f1f2f6;
                    }
                    .stat-icon {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.8rem;
                    }
                    .total-donation .stat-icon {
                        background: #e0dcfc;
                        color: #6c5ce7;
                    }
                    .donor-profile .stat-icon {
                        background: #f1f2f6;
                        color: #2d3436;
                    }
                    .stat-info h3 {
                        font-size: 1.6rem;
                        margin: 0;
                        color: #2d3436;
                    }
                    .stat-info p {
                        margin: 0;
                        color: #636e72;
                        font-size: 0.9rem;
                    }

                    .dashboard-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                    }
                    @media (max-width: 900px) {
                        .dashboard-grid {
                            grid-template-columns: 1fr;
                        }
                    }

                    .dashboard-section {
                        background: white;
                        border-radius: 15px;
                        padding: 2rem;
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
                    .section-header h2 {
                        font-size: 1.3rem;
                        margin: 0;
                        color: #2d3436;
                    }

                    .works-list {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .work-item {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem;
                        border-radius: 10px;
                        background: #f9f9f9;
                        transition: all 0.2s;
                    }
                    .work-item:hover {
                        transform: translateX(5px);
                        background: #f1f2f6;
                    }
                    .work-dot {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #6c5ce7;
                    }
                    .work-content {
                        flex: 1;
                    }
                    .work-content h4 {
                        margin: 0;
                        font-size: 1rem;
                        color: #2d3436;
                    }
                    .work-content p {
                        margin: 0.2rem 0 0;
                        font-size: 0.85rem;
                        color: #636e72;
                    }
                    .arrow {
                        color: #dfe6e9;
                        font-size: 0.8rem;
                    }

                    .history-table-wrapper {
                        overflow-x: auto;
                    }
                    .history-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .history-table th {
                        text-align: left;
                        padding: 1rem 0.5rem;
                        font-size: 0.85rem;
                        color: #636e72;
                        border-bottom: 2px solid #f1f2f6;
                        font-weight: 600;
                    }
                    .history-table td {
                        padding: 1.2rem 0.5rem;
                        border-bottom: 1px solid #f1f2f6;
                        font-size: 0.95rem;
                    }
                    .amount {
                        font-weight: 600;
                        color: #2d3436;
                    }
                    .status {
                        padding: 0.3rem 0.7rem;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        text-transform: capitalize;
                    }
                    .status.completed {
                        background: #d4edda;
                        color: #155724;
                    }
                    .status.pending {
                        background: #fff3cd;
                        color: #856404;
                    }
                    .status.failed {
                        background: #f8d7da;
                        color: #721c24;
                    }
                `}</style>
            </div>
        </DashboardLayout>
    );
};

export default DonorDashboard;
