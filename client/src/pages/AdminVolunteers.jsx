import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

const AdminVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [updatingId, setUpdatingId] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/volunteers`);
            setVolunteers(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching volunteers:', err);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        setUpdatingId(id);
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/volunteers/${id}/status`, { status });

            // Update local state
            setVolunteers(volunteers.map(vol =>
                vol._id === id ? { ...vol, status } : vol
            ));

            // Show success notification
            setNotification({
                show: true,
                message: `Volunteer ${status.toLowerCase()} successfully!`,
                type: 'success'
            });

            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
        } catch (err) {
            console.error('Error updating status:', err);
            setNotification({
                show: true,
                message: 'Failed to update status. Please try again.',
                type: 'error'
            });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredVolunteers = volunteers;



    if (loading) {
        return (
            <DashboardLayout role="Admin">
                <div className="loading">Loading volunteers...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="Admin">
            <div className="admin-volunteers">
                {notification.show && (
                    <div className={`notification ${notification.type}`}>
                        {notification.message}
                    </div>
                )}

                <div className="page-header">
                    <h1>Volunteer List</h1>
                    <p>View details of all registered volunteers</p>
                </div>



                <div className="volunteers-grid">
                    {filteredVolunteers.length === 0 ? (
                        <div className="no-data">No volunteers found</div>
                    ) : (
                        filteredVolunteers.map((volunteer) => (
                            <div key={volunteer._id} className="volunteer-card">
                                <div className="card-header">
                                    <h3>{volunteer.name}</h3>
                                </div>
                                <div className="card-body">
                                    <div className="info-row">
                                        <FaEnvelope className="icon" />
                                        <span>{volunteer.email}</span>
                                    </div>
                                    <div className="info-row">
                                        <FaPhone className="icon" />
                                        <span>{volunteer.phone}</span>
                                    </div>
                                    <div className="info-section">
                                        <strong>Skills:</strong>
                                        <p>{volunteer.skills || 'Not specified'}</p>
                                    </div>
                                    <div className="info-section">
                                        <strong>Availability:</strong>
                                        <p>{volunteer.availability || 'Not specified'}</p>
                                    </div>
                                    {volunteer.message && (
                                        <div className="info-section">
                                            <strong>Message:</strong>
                                            <p>{volunteer.message}</p>
                                        </div>
                                    )}
                                    <div className="card-footer">
                                        <small>Registered: {new Date(volunteer.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                .admin-volunteers {
                    max-width: 1400px;
                    width: 100%;
                }

                .notification {
                    position: fixed;
                    top: 100px;
                    right: 2rem;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 1000;
                    animation: slideIn 0.3s ease-out;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .notification.success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }

                .notification.error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
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

                .volunteers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .volunteer-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex;
                    flex-direction: column;
                }

                .volunteer-card:hover {
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
                    word-break: break-word;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .card-body {
                    padding: 1.5rem;
                    flex: 1;
                }

                .info-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    color: #636e72;
                    word-break: break-word;
                }

                .info-row .icon {
                    color: #6c5ce7;
                    font-size: 1rem;
                    margin-top: 3px;
                    flex-shrink: 0;
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
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
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

                @media (max-width: 500px) {
                    .page-header h1 {
                        font-size: 1.5rem;
                    }

                    .card-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }

                    .volunteers-grid {
                        grid-template-columns: 1fr;
                    }

                    .notification {
                        left: 1rem;
                        right: 1rem;
                        width: auto;
                        text-align: center;
                    }
                }
            `}</style>
        </DashboardLayout >
    );
};

export default AdminVolunteers;
