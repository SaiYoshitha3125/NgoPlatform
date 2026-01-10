import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaUser, FaEnvelope, FaDollarSign, FaCheckCircle, FaClock, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [stats, setStats] = useState({
        total: 0,
        totalAmount: 0,
        completed: 0,
        pending: 0
    });

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/donations`);
            setDonations(res.data);
            calculateStats(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching donations:', err);
            setLoading(false);
        }
    };

    const calculateStats = (donationData) => {
        const total = donationData.length;
        const totalAmount = donationData.reduce((sum, d) => sum + d.amount, 0);
        const completed = donationData.filter(d => d.status === 'Completed').length;
        const pending = donationData.filter(d => d.status === 'Pending').length;

        setStats({ total, totalAmount, completed, pending });
    };

    const filteredDonations = donations.filter(donation => {
        if (filter === 'All') return true;
        return donation.status === filter;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'Completed': { color: '#4caf50', icon: <FaCheckCircle /> },
            'Pending': { color: '#ff9800', icon: <FaClock /> },
            'Failed': { color: '#f44336', icon: <FaTimesCircle /> }
        };
        const config = statusConfig[status] || statusConfig['Completed'];
        return (
            <span className="status-badge" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
                {config.icon} {status}
            </span>
        );
    };

    if (loading) {
        return (
            <DashboardLayout role="Admin">
                <div className="loading">Loading donations...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="Admin">
            <div className="admin-donations">
                <div className="page-header">
                    <h1>Donation Management</h1>
                    <p>Track and manage all donations</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
                            <FaDollarSign style={{ color: '#2196f3' }} />
                        </div>
                        <div className="stat-info">
                            <h3>₹{stats.totalAmount.toLocaleString()}</h3>
                            <p>Total Donations</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
                            <FaCheckCircle style={{ color: '#4caf50' }} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.completed}</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#fff3e0' }}>
                            <FaClock style={{ color: '#ff9800' }} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.pending}</h3>
                            <p>Pending</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#f3e5f5' }}>
                            <FaUser style={{ color: '#9c27b0' }} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.total}</h3>
                            <p>Total Donors</p>
                        </div>
                    </div>
                </div>

                <div className="filter-bar">
                    <button
                        className={filter === 'All' ? 'active' : ''}
                        onClick={() => setFilter('All')}
                    >
                        All ({donations.length})
                    </button>
                    <button
                        className={filter === 'Completed' ? 'active' : ''}
                        onClick={() => setFilter('Completed')}
                    >
                        Completed ({donations.filter(d => d.status === 'Completed').length})
                    </button>
                    <button
                        className={filter === 'Pending' ? 'active' : ''}
                        onClick={() => setFilter('Pending')}
                    >
                        Pending ({donations.filter(d => d.status === 'Pending').length})
                    </button>
                </div>

                <div className="donations-table">
                    {filteredDonations.length === 0 ? (
                        <div className="no-data">No donations found</div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Donor Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Payment Method</th>
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonations.map((donation) => (
                                    <tr key={donation._id}>
                                        <td>
                                            <div className="donor-info">
                                                <FaUser className="donor-icon" />
                                                <strong>{donation.donorName}</strong>
                                            </div>
                                        </td>
                                        <td>{donation.email}</td>
                                        <td className="amount">₹{donation.amount.toLocaleString()}</td>
                                        <td>{donation.paymentMethod}</td>
                                        <td className="transaction-id">{donation.transactionId || 'N/A'}</td>
                                        <td>
                                            <div className="date-info">
                                                <FaCalendarAlt className="date-icon" />
                                                {new Date(donation.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td>{getStatusBadge(donation.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <style>{`
                .admin-donations {
                    max-width: 100%;
                    width: 100%;
                }

                .page-header {
                    margin-bottom: 1.5rem;
                }

                .page-header h1 {
                    font-size: 1.8rem;
                    margin-bottom: 0.25rem;
                    color: #2d3436;
                }

                .page-header p {
                    color: #636e72;
                    font-size: 0.95rem;
                    margin: 0;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .stat-card {
                    background: white;
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    transition: transform 0.2s;
                    border: 1px solid #f1f2f6;
                }

                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
                }

                .stat-icon {
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }

                .stat-info h3 {
                    margin: 0;
                    font-size: 1.4rem;
                    color: #2d3436;
                    line-height: 1.2;
                }

                .stat-info p {
                    margin: 0;
                    color: #636e72;
                    font-size: 0.8rem;
                }

                .filter-bar {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .filter-bar button {
                    padding: 0.5rem 1rem;
                    border: 1px solid #e1e8ed;
                    background: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }

                .filter-bar button:hover {
                    border-color: #6c5ce7;
                    color: #6c5ce7;
                }

                .filter-bar button.active {
                    background: #6c5ce7;
                    color: white;
                    border-color: #6c5ce7;
                }

                .donations-table {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    overflow: hidden;
                    width: 100%;
                    overflow-x: auto;
                    border: 1px solid #f1f2f6;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px; /* Reduced min-width */
                }

                thead {
                    background: #f8f9fa;
                }

                th {
                    padding: 0.8rem 1rem;
                    text-align: left;
                    font-weight: 600;
                    color: #2d3436;
                    border-bottom: 2px solid #e1e8ed;
                    white-space: nowrap;
                    font-size: 0.9rem;
                }

                td {
                    padding: 0.8rem 1rem;
                    border-bottom: 1px solid #f1f3f5;
                    color: #636e72;
                    vertical-align: middle;
                    font-size: 0.9rem;
                }

                tbody tr:nth-child(even) {
                    background-color: #fcfcfc;
                }

                tbody tr:hover {
                    background-color: #f1f2f6;
                }

                .donor-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 500;
                }

                .donor-icon {
                    color: #6c5ce7;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }

                .amount {
                    font-weight: 700;
                    color: #4caf50;
                }

                .transaction-id {
                    font-family: monospace;
                    font-size: 0.8rem;
                    color: #999;
                    background: #f1f2f6;
                    padding: 2px 6px;
                    border-radius: 4px;
                }

                .date-info {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    white-space: nowrap;
                }

                .date-icon {
                    color: #6c5ce7;
                    font-size: 0.8rem;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.3rem 0.6rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .loading, .no-data {
                    text-align: center;
                    padding: 2rem;
                    color: #636e72;
                    font-size: 1rem;
                }

                @media (max-width: 768px) {
                    .page-header h1 {
                        font-size: 1.5rem;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr); /* 2 per row on mobile for better space usage, if they fit */
                        gap: 0.8rem;
                    }

                    .stat-card {
                        padding: 0.8rem;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    
                    .stat-icon {
                        width: 35px;
                        height: 35px;
                        font-size: 1rem;
                    }
                    
                    .stat-info h3 {
                        font-size: 1.2rem;
                    }

                    .filter-bar button {
                        padding: 0.4rem 0.8rem;
                        font-size: 0.85rem;
                        flex: 1; /* Distribute evenly */
                        text-align: center;
                    }
                    
                    th, td {
                        padding: 0.6rem 0.8rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr; /* Stack on very small screens */
                    }
                    
                    .stat-card {
                        flex-direction: row; /* Revert to row for full width cards */
                        align-items: center;
                    }
                }
            `}</style>
        </DashboardLayout >
    );
};

export default AdminDonations;
