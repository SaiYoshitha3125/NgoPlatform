import React from 'react';

const Gallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1547937084-4d587301a545?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523289217630-0dd16184af8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1636986905406-758b0e280f49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621973856220-29115d9b5d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    return (
        <div className="page-container">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Our Gallery</h1>
                    <div className="gallery-grid">
                        {images.map((url, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={url} alt={`Gallery ${index + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <style>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .gallery-item {
                    border-radius: 10px;
                    overflow: hidden;
                    height: 250px;
                    box-shadow: var(--shadow);
                    cursor: pointer;
                    transition: var(--transition);
                }
                .gallery-item:hover {
                    box-shadow: var(--shadow-hover);
                    transform: scale(1.02);
                }
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: var(--transition);
                }
                .gallery-item:hover img {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default Gallery;
