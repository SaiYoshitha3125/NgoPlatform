import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import About from './About';
import Mission from './Mission';
import Team from './Team';
import Gallery from './Gallery';
import Contact from './Contact';

// Import Assets
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';
import impactSunita from '../assets/impact_sunita.png';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    // Carousel Logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: hero1,
            title: "Where Women Lead, Society Thrives",
            subtitle: "Join us in our mission to empower communities."
        },
        {
            image: hero2,
            title: "Education is Power",
            subtitle: "Building a brighter future for every girl."
        },
        {
            image: hero3,
            title: "Skills for Independence",
            subtitle: "Creating economic opportunities through vocational training."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="home">
            {/* 1. Hero Carousel Section */}
            <section className="hero-carousel">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)), url(${slide.image})` }}
                    >
                        <div className="hero-content container">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <div className="hero-buttons">
                                <Link to="/donate" className="btn btn-primary">Donate</Link>
                                <Link to="/volunteer" className="btn btn-outline">Volunteer</Link>
                                <Link to="/#about" className="btn btn-outline">Know More</Link>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </section>

            {/* 2. About Section */}
            <div id="about">
                <About />
            </div>

            {/* 3. Mission & Vision Section */}
            <div id="mission">
                <Mission />
            </div>

            {/* 4. Our Core Values Section */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="icon">❤️</div>
                            <h3>Compassion</h3>
                            <p>Caring for every individual</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">⚖️</div>
                            <h3>Equality</h3>
                            <p>Equal opportunities for all</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🔍</div>
                            <h3>Transparency</h3>
                            <p>Open and honest operations</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🌱</div>
                            <h3>Growth</h3>
                            <p>Continuous development</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🤝</div>
                            <h3>Empowerment</h3>
                            <p>Strengthening communities</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Projects Section (formerly Features) */}
            <section className="section features" id="projects">
                <div className="container">
                    <h2 className="section-title">Our Projects</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon">🧵</div>
                            <h3>Skill Development Center</h3>
                            <p>Vocational training for women in tailoring, handicrafts, and soft toys making.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon">📚</div>
                            <h3>Project Vidya</h3>
                            <p>After-school tuition and scholarship programs for girls from low-income families.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon">👩‍⚕️</div>
                            <h3>Swasthya Initiative</h3>
                            <p>Mobile health camps and hygiene awareness workshops in rural clusters.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Impact Section */}
            <section className="section bg-light text-center" id="impact">
                <div className="container">
                    <h2 className="section-title">Our Impact</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon">👩‍🎓</div>
                            <h3>500+</h3>
                            <p>Women Empowered</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon">👧</div>
                            <h3>120+</h3>
                            <p>Child Education Supported</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon">🏥</div>
                            <h3>30+</h3>
                            <p>Health Camps Conducted</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Team Section */}
            <div id="team">
                <Team />
            </div>

            {/* 8. Impact Story */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="section-title">Impact Story</h2>
                    <div className="story-card">
                        <div className="story-img">
                            <img src={impactSunita} alt="Impact Story - Sunita Devi" />
                        </div>
                        <div className="story-content">
                            <h3>From Homemaker to Entrepreneur</h3>
                            <p>"Before joining Orbosis Foundation's tailoring workshop, I had no independent income. Today, I run my own boutique and employ three other women from my village. This organization didn't just give me skills; it gave me the confidence to dream big."</p>
                            <p className="story-author">- Sunita Devi, Beneficiary</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Gallery Section */}
            <div id="gallery">
                <Gallery />
            </div>

            {/* 10. Contact Section */}
            <div id="contact">
                <Contact />
            </div>

            <style>{`
                .hero-carousel {
                    position: relative;
                    height: 80vh;
                    overflow: hidden;
                    background-color: var(--primary); /* Fallback */
                }
                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                    text-align: center;
                    color: white;
                }
                .slide.active {
                    opacity: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 900px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }
                .hero-carousel h1 {
                    font-size: 4rem;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    color: white; /* Ensure text is white on hero */
                    text-shadow: 4px 4px 0px #000; /* Cartoon outline effect */
                }
                .hero-carousel p {
                    font-size: 1.5rem;
                    margin-bottom: 2.5rem;
                    font-weight: 600;
                    text-shadow: 2px 2px 0px #000;
                }
                .hero-buttons {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                }
                .carousel-indicators {
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 1rem;
                    z-index: 3;
                }
                .indicator {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.5);
                    border: 2px solid white;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .indicator.active {
                    background: white;
                    transform: scale(1.2);
                }

                .features-grid, .values-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2.5rem;
                }
                
                .icon {
                    font-size: 4rem;
                    margin-bottom: 1.5rem;
                    text-shadow: 2px 2px 0px var(--secondary);
                }
                
                /* Impact Story Styles */
                .story-card {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0; /* Remove gap for split layout */
                    align-items: stretch;
                    background: #f9f9f9;
                    border-radius: var(--border-radius);
                    overflow: hidden;
                    box-shadow: var(--shadow);
                    border: var(--border-width) solid var(--border-color);
                }
                .story-img {
                    position: relative;
                    min-height: 400px;
                    border-right: var(--border-width) solid var(--border-color);
                }
                .story-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .story-content {
                    padding: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: white;
                }
                .story-content h3 {
                    color: var(--primary);
                    margin-bottom: 1.5rem;
                    font-size: 2.2rem;
                }
                .story-content p {
                    font-size: 1.2rem;
                    color: var(--text-dark);
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                    font-weight: 500;
                }
                .story-author {
                    font-weight: 800;
                    color: var(--secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                @media (max-width: 768px) {
                    .hero-carousel h1 {
                        font-size: 2.5rem;
                    }
                    .story-card {
                        grid-template-columns: 1fr;
                    }
                    .story-img {
                        height: 300px;
                        border-right: none;
                        border-bottom: var(--border-width) solid var(--border-color);
                    }
                }

                /* Core Values Specific Styles */
                .values-grid {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    flex-wrap: wrap; /* Allow wrapping on small screens but keep one line on large */
                    align-items: flex-start;
                }

                .value-card {
                    text-align: center;
                    padding: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                    flex: 1;
                    min-width: 150px;
                    max-width: 200px;
                }
                
                .value-card .icon {
                    width: 120px; /* Slightly larger for emphasis */
                    height: 120px;
                    line-height: 120px;
                    border-radius: 50%;
                    margin: 0 auto 1.5rem;
                    font-size: 4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid #000;
                    background-color: white; /* Default fallback */
                }

                /* Pastel Colors for Core Values Icons */
                .value-card:nth-child(1) .icon { background-color: #FFB7B2; } /* Pastel Red */
                .value-card:nth-child(2) .icon { background-color: #B5EAD7; } /* Pastel Green */
                .value-card:nth-child(3) .icon { background-color: #C7CEEA; } /* Pastel Purple/Blue */
                .value-card:nth-child(4) .icon { background-color: #FFFDAC; } /* Pastel Yellow */
                .value-card:nth-child(5) .icon { background-color: #FFDAC1; } /* Pastel Orange */
                
                .value-card h3 {
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    font-size: 1.2rem;
                }
                .value-card p {
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
            `}</style>
        </div>
    );
};


export default Home;
