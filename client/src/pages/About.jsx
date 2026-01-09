import React from 'react';

const About = () => {
    return (
        <div className="page-container">
            <section className="section bg-light">
                <div className="container">
                    <h1 className="section-title">About Us</h1>
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Who We Are</h2>
                            <p>We are a non-profit organization dedicated to bridging the gap in healthcare accessibility. Founded in 2020, our team consists of doctors, volunteers, and changemakers committed to making a difference.</p>
                            <p>Our journey began with a simple idea: that no one should be denied basic medical care due to financial constraints or geographical location.</p>
                        </div>
                        <div className="about-image">
                            <img src="https://i.pinimg.com/originals/d6/0f/63/d60f63f6dd27989ce8756c37f774d309.gif" alt="Team" />
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .about-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }
                .about-text h2 {
                    color: var(--primary);
                    margin-bottom: 1.5rem;
                }
                .about-text p {
                    margin-bottom: 1rem;
                    color: #555;
                    font-size: 1.1rem;
                }
                .about-image img {
                    width: 100%;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                }
                @media (max-width: 768px) {
                    .about-content {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default About;
