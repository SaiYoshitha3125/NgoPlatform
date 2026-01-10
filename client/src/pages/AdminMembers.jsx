import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaUser, FaEnvelope, FaCalendar, FaUserTag } from 'react-icons/fa';
import axios from 'axios';

const AdminMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users?role=Member`);
            setMembers(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching members:', err);
            setLoading(false);
        }
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            'Member': '#3498db',
            'Admin': '#e74c3c',
            'Volunteer': '#2ecc71',
            'Donor': '#f39c12'
        };
        return colors[role] || '#95a5a6';
    };

    if (loading) {
        return (
            <DashboardLayout role="Admin">
                <div className="loading">Loading members...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="Admin">
            <div className="admin-members">
                <div className="page-header">
                    <h1>Member Management</h1>
                    <p>View and manage organization members</p>
                </div>

                <div className="stats-bar">
                    <div className="stat-item">
                        <span className="stat-label">Total Members</span>
                        <span className="stat-value">{members.length}</span>
                    </div>
                </div>

                <div className="members-table-container">
                    {members.length === 0 ? (
                        <div className="no-data">No members found</div>
                    ) : (
                        <table className="members-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member._id}>
                                        <td>
                                            <div className="member-name">
                                                <div className="avatar">
                                                    {member.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{member.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="email-cell">
                                                <FaEnvelope className="icon" />
                                                {member.email}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="role-badge"
                                                style={{
                                                    backgroundColor: `${getRoleBadgeColor(member.role)}20`,
                                                    color: getRoleBadgeColor(member.role)
                                                }}
                                            >
                                                <FaUserTag /> {member.role}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="date-cell">
                                                <FaCalendar className="icon" />
                                                {new Date(member.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <style>{`
                .admin-members {
                    max-width: 1400px;
                    width: 100%;
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

                .stats-bar {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-label {
                    font-size: 0.9rem;
                    color: #636e72;
                    margin-bottom: 0.5rem;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #6c5ce7;
                }

                .members-table-container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    overflow: hidden;
                    overflow-x: auto;
                    width: 100%;
                }

                .members-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }

                .members-table thead {
                    background: #f8f9fa;
                }

                .members-table th {
                    padding: 1rem 1.5rem;
                    text-align: left;
                    font-weight: 600;
                    color: #2d3436;
                    border-bottom: 2px solid #e1e8ed;
                    white-space: nowrap;
                }

                .members-table tbody tr {
                    border-bottom: 1px solid #f1f3f5;
                    transition: background-color 0.2s;
                }

                .members-table tbody tr:hover {
                    background-color: #f8f9fa;
                }

                .members-table td {
                    padding: 1rem 1.5rem;
                    color: #636e72;
                    vertical-align: middle;
                }

                .member-name {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-weight: 500;
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 1.1rem;
                    flex-shrink: 0;
                }

                .email-cell, .date-cell {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .email-cell .icon, .date-cell .icon {
                    color: #6c5ce7;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }

                .role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .loading, .no-data {
                    text-align: center;
                    padding: 3rem;
                    color: #636e72;
                    font-size: 1.1rem;
                }

                @media (max-width: 768px) {
                    .page-header h1 {
                        font-size: 1.6rem;
                    }

                    .stats-bar {
                        flex-direction: column;
                        gap: 1rem;
                        padding: 1rem;
                    }
                }
            `}</style>
        </DashboardLayout >
    );
};

export default AdminMembers;
