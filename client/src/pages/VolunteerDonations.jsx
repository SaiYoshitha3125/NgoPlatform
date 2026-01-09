import React from 'react';
import { FaHandHoldingHeart, FaCalendarDay, FaTag } from 'react-icons/fa';

const VolunteerDonations = () => {
    // Static data for donations
    const donations = [
        {
            id: 1,
            amount: 500,
            date: '2023-11-15',
            cause: 'Project Vidya',
            status: 'Completed',
            paymentMethod: 'UPI'
        },
        {
            id: 2,
            amount: 1200,
            date: '2023-12-10',
            cause: 'Skill Development Center',
            status: 'Completed',
            paymentMethod: 'Card'
        },
        {
            id: 3,
            amount: 250,
            date: '2024-01-05',
            cause: 'General Fund',
            status: 'Completed',
            paymentMethod: 'UPI'
        }
    ];

    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="volunteer-donations-view">
            <div className="page-header">
                <h1>My Donations</h1>
                <p>Track your financial contributions and support</p>
            </div>

            <div className="donations-summary">
                <div className="summary-card">
                    <div className="icon"><FaHandHoldingHeart /></div>
                    <div className="info">
                        <h3>Total Contributed</h3>
                        <p className="amount">₹{totalDonated}</p>
                    </div>
                </div>
            </div>

            <div className="donations-list">
                <h3>Translation History</h3>
                {donations.length > 0 ? (
                    <div className="table-responsive">
                        <table className="donations-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Cause</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <tr key={donation.id}>
                                        <td><FaCalendarDay style={{ marginRight: '5px', color: '#666' }} /> {donation.date}</td>
                                        <td>{donation.cause}</td>
                                        <td className="amount-cell">₹{donation.amount}</td>
                                        <td><span className="status-badge completed">{donation.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="no-data">No donations recorded yet.</p>
                )}
            </div>

            <style>{`
                .donations-summary {
                    margin-bottom: 2rem;
                }
                .summary-card {
                    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
                    color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    max-width: 400px;
                    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);
                }
                .summary-card .icon {
                    font-size: 3rem;
                    background: rgba(255,255,255,0.2);
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .summary-card .info h3 { margin: 0; font-size: 1.1rem; opacity: 0.9; }
                .summary-card .info p.amount { margin: 0; font-size: 2.5rem; font-weight: 700; }

                .donations-list h3 { margin-bottom: 1rem; color: #2d3436; }
                .table-responsive {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    overflow: hidden;
                }
                .donations-table { width: 100%; border-collapse: collapse; }
                .donations-table th, .donations-table td {
                    padding: 1rem 1.5rem;
                    text-align: left;
                    border-bottom: 1px solid #f1f1f1;
                }
                .donations-table th { background: #f8f9fa; font-weight: 600; color: #636e72; }
                .donations-table tr:last-child td { border-bottom: none; }
                .amount-cell { font-weight: 600; color: #2d3436; }
                .status-badge {
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }
                .status-badge.completed { background: #d4edda; color: #155724; }
            `}</style>
        </div>
    );
};

export default VolunteerDonations;
