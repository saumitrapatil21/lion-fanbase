import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-preview');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero__background">
        <div className="hero__image-overlay"></div>
        <img
          src="/72b12110-a1c8-4300-9924-4648526bbb7f.jpg"
          alt="Friendly lion family in their beautiful home"
          className="hero__image"
          loading="eager"
        />
      </div>
      
      <div className="hero__container">
        <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
          <div className="hero__main-section">
            <div className="hero__text-content">
              <h1 className="hero__title">
                🦁 <span className="hero__title-highlight">LIONS!</span> 🌟
              </h1>

              <p className="hero__description">
                🎉 🔊 📸 🎮
              </p>
            </div>

            <div className="hero__image-section">
              <img
                src="/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg"
                alt="Majestic male lion with golden mane"
                className="hero__lion-image"
              />
            </div>
          </div>

          <div className="hero__about">
            <h2 className="hero__about-title">🌟 Learn About Lions! 🦁</h2>
            <p className="hero__about-text">
              🎯 Perfect for kids! Discover amazing lion facts, see beautiful photos,
              and upload your own pictures! 📚 Learn where lions live, what they eat,
              and how they act. 🎮 Fun, colorful, and easy to use!
            </p>
          </div>

          <div className="hero__actions">
            <Link to="/gallery" className="hero__cta-primary">
              🖼️ See Cool Pictures!
            </Link>
            <button
              onClick={scrollToContent}
              className="hero__cta-secondary"
              aria-label="Scroll to fun content"
            >
              🎉 Let's Explore!
            </button>
          </div>
        </div>
        
        <div className="hero__scroll-indicator" onClick={scrollToContent}>
          <div className="hero__scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
