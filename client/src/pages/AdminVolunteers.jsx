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
            const res = await axios.get('http://localhost:5000/api/volunteers');
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
            await axios.put(`http://localhost:5000/api/volunteers/${id}/status`, { status });

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

                .volunteers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .volunteer-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
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

                .action-buttons {
                    display: flex;
                    gap: 0.5rem;
                }

                .action-buttons button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }

                .action-buttons button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .btn-approve {
                    background-color: #4caf50;
                    color: white;
                }

                .btn-approve:hover:not(:disabled) {
                    background-color: #45a049;
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
                }

                .btn-reject {
                    background-color: #f44336;
                    color: white;
                }

                .btn-reject:hover:not(:disabled) {
                    background-color: #da190b;
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
                }

                .loading, .no-data {
                    text-align: center;
                    padding: 3rem;
                    color: #636e72;
                    font-size: 1.1rem;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default AdminVolunteers;
