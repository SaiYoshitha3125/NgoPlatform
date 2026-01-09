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
            const res = await axios.get('http://localhost:5000/api/donations');
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
                    max-width: 1400px;
                }

                .page-header {
                    margin-bottom: 2rem;
                }

                .page-header h1 {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    color: #2d3436;
                }

                .page-header p {
                    color: #636e72;
                    font-size: 1rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .stat-info h3 {
                    margin: 0;
                    font-size: 1.8rem;
                    color: #2d3436;
                }

                .stat-info p {
                    margin: 0.25rem 0 0 0;
                    color: #636e72;
                    font-size: 0.9rem;
                }

                .filter-bar {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }

                .filter-bar button {
                    padding: 0.75rem 1.5rem;
                    border: 2px solid #e1e8ed;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
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
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    overflow: hidden;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                thead {
                    background: #f8f9fa;
                }

                th {
                    padding: 1rem;
                    text-align: left;
                    font-weight: 600;
                    color: #2d3436;
                    border-bottom: 2px solid #e1e8ed;
                }

                td {
                    padding: 1rem;
                    border-bottom: 1px solid #f1f3f5;
                    color: #636e72;
                }

                tbody tr:hover {
                    background: #f8f9fa;
                }

                .donor-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .donor-icon {
                    color: #6c5ce7;
                    font-size: 1rem;
                }

                .amount {
                    font-weight: 700;
                    color: #4caf50;
                    font-size: 1.1rem;
                }

                .transaction-id {
                    font-family: monospace;
                    font-size: 0.85rem;
                    color: #999;
                }

                .date-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .date-icon {
                    color: #6c5ce7;
                    font-size: 0.9rem;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .loading, .no-data {
                    text-align: center;
                    padding: 3rem;
                    color: #636e72;
                    font-size: 1.1rem;
                }

                @media (max-width: 768px) {
                    .donations-table {
                        overflow-x: auto;
                    }

                    table {
                        min-width: 800px;
                    }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default AdminDonations;
