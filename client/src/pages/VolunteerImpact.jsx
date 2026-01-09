import React from 'react';
import { FaChartBar, FaTrophy, FaHandHoldingHeart } from 'react-icons/fa';

const VolunteerImpact = () => {
    // Static data for impact report
    const impactScore = 92;
    const hoursContributed = 45;
    const livesImpacted = 15;

    return (
        <div className="volunteer-impact-view">
            <div className="page-header">
                <h1>Impact Report</h1>
                <p>Visualizing your contributions and community reach</p>
            </div>

            <div className="impact-overview">
                <div className="impact-card score-card">
                    <div className="score-circle">
                        <span>{impactScore}</span>
                        <label>Impact Score</label>
                    </div>
                    <p className="score-desc">You are in the top 5% of volunteers!</p>
                </div>

                <div className="impact-card stats-list">
                    <div className="impact-stat">
                        <div className="icon blue"><FaChartBar /></div>
                        <div>
                            <h4>{hoursContributed} Hours</h4>
                            <p>Time Dedicated</p>
                        </div>
                    </div>
                    <div className="impact-stat">
                        <div className="icon green"><FaHandHoldingHeart /></div>
                        <div>
                            <h4>{livesImpacted} Lives</h4>
                            <p>Directly Impacted</p>
                        </div>
                    </div>
                    <div className="impact-stat">
                        <div className="icon gold"><FaTrophy /></div>
                        <div>
                            <h4>Elite Status</h4>
                            <p>Volunteer Level</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-container">
                    <h3>Contribution Activity (Last 6 Months)</h3>
                    <div className="bar-chart">
                        {/* CSS only Bar Chart */}
                        <div className="bar-group">
                            <div className="bar" style={{ height: '40%' }} title="Aug: 12 hrs"><span>Aug</span></div>
                            <div className="bar" style={{ height: '60%' }} title="Sep: 18 hrs"><span>Sep</span></div>
                            <div className="bar" style={{ height: '30%' }} title="Oct: 9 hrs"><span>Oct</span></div>
                            <div className="bar" style={{ height: '80%' }} title="Nov: 24 hrs"><span>Nov</span></div>
                            <div className="bar" style={{ height: '50%' }} title="Dec: 15 hrs"><span>Dec</span></div>
                            <div className="bar active" style={{ height: '70%' }} title="Jan: 21 hrs"><span>Jan</span></div>
                        </div>
                    </div>
                </div>

                <div className="chart-container">
                    <h3>Task Distribution</h3>
                    <div className="skills-tags">
                        <span className="skill-tag" style={{ width: '80%' }}>Teaching (80%)</span>
                        <span className="skill-tag" style={{ width: '45%' }}>Event Mgmt (45%)</span>
                        <span className="skill-tag" style={{ width: '30%' }}>Logistics (30%)</span>
                    </div>
                </div>
            </div>

            <style>{`
                .impact-overview {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .impact-card {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .score-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: linear-gradient(135deg, #2d3436, #636e72);
                    color: white;
                }

                .score-circle {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    border: 8px solid #00cec9;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .score-circle span { font-size: 3rem; font-weight: 800; line-height: 1; }
                .score-circle label { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; }
                .score-desc { font-size: 1.1rem; opacity: 0.9; }

                .stats-list { display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; }
                .impact-stat { display: flex; align-items: center; gap: 1.5rem; }
                .impact-stat .icon {
                    width: 50px; height: 50px; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.5rem; color: white;
                }
                .icon.blue { background: #0984e3; }
                .icon.green { background: #00b894; }
                .icon.gold { background: #fdcb6e; }
                .impact-stat h4 { margin: 0; font-size: 1.2rem; }
                .impact-stat p { margin: 0; color: #636e72; }

                .charts-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 2rem;
                }

                .chart-container {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
                .chart-container h3 { margin-bottom: 2rem; color: #2d3436; font-size: 1.2rem; }

                .bar-chart {
                    height: 200px;
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #dfe6e9;
                }
                .bar-group {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    align-items: flex-end;
                    height: 100%;
                }
                .bar {
                    width: 12%;
                    background: #dfe6e9;
                    border-radius: 6px 6px 0 0;
                    position: relative;
                    transition: height 0.5s ease;
                }
                .bar.active { background: #6c5ce7; }
                .bar:hover { background: #a29bfe; cursor: pointer; }
                .bar span {
                    position: absolute;
                    bottom: -25px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.8rem;
                    color: #636e72;
                }

                .skills-tags { display: flex; flex-direction: column; gap: 1rem; }
                .skill-tag {
                    background: #f1f2f6;
                    padding: 0.8rem 1rem;
                    border-radius: 8px;
                    color: #2d3436;
                    font-weight: 600;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .skill-tag::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; height: 100%; width: 100%;
                    background: rgba(108, 92, 231, 0.1);
                    z-index: -1;
                }
            `}</style>
        </div>
    );
};

export default VolunteerImpact;
