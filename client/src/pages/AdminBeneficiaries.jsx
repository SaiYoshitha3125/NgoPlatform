import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHandHoldingHeart, FaCheckCircle, FaClock } from 'react-icons/fa';
import axios from 'axios';

const AdminBeneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const fetchBeneficiaries = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/beneficiaries`);
            setBeneficiaries(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching beneficiaries:', err);
            setLoading(false);
        }
    };

    const filteredBeneficiaries = beneficiaries.filter(ben => {
        if (filter === 'All') return true;
        return ben.status === filter;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'Active': { color: '#4caf50', icon: <FaCheckCircle /> },
            'Pending': { color: '#ff9800', icon: <FaClock /> },
            'Completed': { color: '#2196f3', icon: <FaCheckCircle /> },
            'Inactive': { color: '#9e9e9e', icon: <FaClock /> }
        };
        const config = statusConfig[status] || statusConfig['Pending'];
        return (
            <span className="status-badge" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
                {config.icon} {status}
            </span>
        );
    };

    const getAssistanceColor = (type) => {
        const colors = {
            'Education': '#3498db',
            'Healthcare': '#e74c3c',
            'Financial': '#f39c12',
            'Food & Nutrition': '#2ecc71',
            'Shelter': '#9b59b6',
            'Other': '#95a5a6'
        };
        return colors[type] || '#95a5a6';
    };

    if (loading) {
        return (
            <DashboardLayout role="Admin">
                <div className="loading">Loading beneficiaries...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="Admin">
            <div className="admin-beneficiaries">
                <div className="page-header">
                    <h1>Beneficiary Management</h1>
                    <p>Manage and track beneficiaries receiving assistance</p>
                </div>

                <div className="filter-bar">
                    <button
                        className={filter === 'All' ? 'active' : ''}
                        onClick={() => setFilter('All')}
                    >
                        All ({beneficiaries.length})
                    </button>
                    <button
                        className={filter === 'Active' ? 'active' : ''}
                        onClick={() => setFilter('Active')}
                    >
                        Active ({beneficiaries.filter(b => b.status === 'Active').length})
                    </button>
                    <button
                        className={filter === 'Pending' ? 'active' : ''}
                        onClick={() => setFilter('Pending')}
                    >
                        Pending ({beneficiaries.filter(b => b.status === 'Pending').length})
                    </button>
                    <button
                        className={filter === 'Completed' ? 'active' : ''}
                        onClick={() => setFilter('Completed')}
                    >
                        Completed ({beneficiaries.filter(b => b.status === 'Completed').length})
                    </button>
                </div>

                <div className="beneficiaries-grid">
                    {filteredBeneficiaries.length === 0 ? (
                        <div className="no-data">
                            <FaHandHoldingHeart style={{ fontSize: '3rem', color: '#dfe6e9', marginBottom: '1rem' }} />
                            <p>No beneficiaries found</p>
                        </div>
                    ) : (
                        filteredBeneficiaries.map((beneficiary) => (
                            <div key={beneficiary._id} className="beneficiary-card">
                                <div className="card-header">
                                    <h3>{beneficiary.name}</h3>
                                    {getStatusBadge(beneficiary.status)}
                                </div>
                                <div className="card-body">
                                    <div className="assistance-type" style={{
                                        backgroundColor: `${getAssistanceColor(beneficiary.assistanceType)}20`,
                                        color: getAssistanceColor(beneficiary.assistanceType)
                                    }}>
                                        <FaHandHoldingHeart /> {beneficiary.assistanceType}
                                    </div>

                                    <div className="info-row">
                                        <FaEnvelope className="icon" />
                                        <span>{beneficiary.email}</span>
                                    </div>
                                    <div className="info-row">
                                        <FaPhone className="icon" />
                                        <span>{beneficiary.phone}</span>
                                    </div>
                                    <div className="info-row">
                                        <FaMapMarkerAlt className="icon" />
                                        <span>{beneficiary.address}</span>
                                    </div>

                                    {beneficiary.age && (
                                        <div className="info-detail">
                                            <strong>Age:</strong> {beneficiary.age} years
                                        </div>
                                    )}

                                    {beneficiary.familySize && (
                                        <div className="info-detail">
                                            <strong>Family Size:</strong> {beneficiary.familySize} members
                                        </div>
                                    )}

                                    {beneficiary.description && (
                                        <div className="info-section">
                                            <strong>Description:</strong>
                                            <p>{beneficiary.description}</p>
                                        </div>
                                    )}

                                    <div className="card-footer">
                                        <small>Registered: {new Date(beneficiary.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                .admin-beneficiaries {
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

                .beneficiaries-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .beneficiary-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .beneficiary-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #f1f3f5;
                }

                .card-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: #2d3436;
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

                .card-body {
                    padding: 1.5rem;
                }

                .assistance-type {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .info-row {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    color: #636e72;
                }

                .info-row .icon {
                    color: #6c5ce7;
                    font-size: 1rem;
                    min-width: 16px;
                }

                .info-detail {
                    margin-top: 0.75rem;
                    color: #636e72;
                }

                .info-detail strong {
                    color: #2d3436;
                    margin-right: 0.5rem;
                }

                .info-section {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f3f5;
                }

                .info-section strong {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #2d3436;
                }

                .info-section p {
                    margin: 0;
                    color: #636e72;
                    line-height: 1.6;
                }

                .card-footer {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f3f5;
                }

                .card-footer small {
                    color: #b2bec3;
                }

                .loading, .no-data {
                    text-align: center;
                    padding: 3rem;
                    color: #636e72;
                    font-size: 1.1rem;
                }

                .no-data {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    grid-column: 1 / -1;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default AdminBeneficiaries;
