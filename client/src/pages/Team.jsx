import React from 'react';

const Team = () => {
    const teamMembers = [
        {
            name: "Dr. Sarah Johnson",
            role: "Founder & CEO",
            image: "https://i.pinimg.com/736x/94/19/d5/9419d532beed2952fad9317d20d1d801.jpg"
        },
        {
            name: "Dr. Giyu Tomioka",
            role: "Chief Medical Officer",
            image: "https://i.pinimg.com/736x/09/df/ed/09dfed49c969239cb40c53ceaf21ed67.jpg"
        },
        {
            name: "Michael Chen",
            role: "Operations Director",
            image: "https://i.pinimg.com/736x/21/3c/82/213c826a1d7da2bcaf4e3cb7209fdefb.jpg"
        },
        {
            name: "Elena Rodriguez",
            role: "Community Outreach",
            image: "https://i.pinimg.com/736x/a4/dc/e1/a4dce14e799743be984016ac7f6734c4.jpg"
        }
    ];

    return (
        <div className="page-container">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Meet Our Team</h1>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div className="team-card" key={index}>
                                <div className="team-img">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <p>{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <style>{`
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }
                .team-card {
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: var(--shadow);
                    transition: var(--transition);
                }
                .team-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-hover);
                }
                .team-img {
                    height: 250px;
                    overflow: hidden;
                }
                .team-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: var(--transition);
                }
                .team-card:hover .team-img img {
                    transform: scale(1.05);
                }
                .team-info {
                    padding: 1.5rem;
                    text-align: center;
                }
                .team-info h3 {
                    color: var(--primary);
                    margin-bottom: 0.5rem;
                }
                .team-info p {
                    color: var(--secondary);
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default Team;
