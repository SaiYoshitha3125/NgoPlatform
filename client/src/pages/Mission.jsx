import React from 'react';

const Mission = () => {
    return (
        <div className="page-container">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Mission & Vision</h1>
                    <div className="mission-grid">
                        <div className="mission-card">
                            <h2>Our Mission</h2>
                            <p>"To provide accessible, affordable, and quality healthcare services to marginalized communities, empowering them to lead healthier lives."</p>
                        </div>
                        <div className="mission-card">
                            <h2>Our Vision</h2>
                            <p>"A world where quality healthcare is a fundamental right, not a privilege, and where every individual has the opportunity to thrive physically and mentally."</p>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .mission-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                }
                .mission-card {
                    background: white;
                    padding: 3rem;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    text-align: center;
                    border-top: 5px solid var(--secondary);
                }
                .mission-card h2 {
                    color: var(--primary);
                    margin-bottom: 1.5rem;
                    font-size: 2rem;
                }
                .mission-card p {
                    font-size: 1.2rem;
                    font-style: italic;
                    color: #555;
                }
            `}</style>
        </div>
    );
};

export default Mission;
