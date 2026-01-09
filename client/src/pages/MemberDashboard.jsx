import React from 'react';

const MemberDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Welcome, Member!</h2>
                <p>This is your personalized dashboard.</p>
                {/* Add member-specific content here */}
            </div>
            <style>{`
                .dashboard-container {
                    padding: 2rem;
                    background-color: var(--bg-light);
                    min-height: 80vh;
                }
                .dashboard-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                }
                h2 {
                    color: var(--primary);
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
};

export default MemberDashboard;
