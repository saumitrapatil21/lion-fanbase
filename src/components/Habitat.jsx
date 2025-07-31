import React, { useEffect, useRef, useState } from 'react';

const Habitat = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleSections(prev => [...new Set([...prev, sectionIndex])]);
            }, sectionIndex * 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const habitatSections = [
    {
      id: 'distribution',
      title: '🌍 Where Lions Live',
      icon: '🌍',
      content: '🦁 ➡️ 🌍 Africa + 🇮🇳 India',
      image: '/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg',
      visual: '🌍 🦁 🏡'
    },
    {
      id: 'environment',
      title: '🌿 Lion Neighborhoods',
      icon: '🌿',
      content: '🌾 Grass + 🌳 Trees + 💧 Water = 😊 Happy Lions',
      image: '/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg',
      visual: '🌾 + 🌳 + 💧 = 🦁'
    },
    {
      id: 'homes',
      title: '🏠 Lion Houses',
      icon: '🏠',
      content: '🌳 Under trees + 🌾 In grass + 🪨 On rocks',
      image: '/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg',
      visual: '🌳 🌾 🪨 = 🏠'
    }
  ];

  return (
    <div className="habitat-page">
      <div className="habitat-page__container">
        <div className="habitat-page__header">
          <h1 className="habitat-page__title">🏠 🦁 🌍</h1>
          <p className="habitat-page__subtitle">
            🦁 ➡️ 🏡 ➡️ 😊
          </p>
        </div>

        <div className="habitat-page__hero-image">
          <img 
            src="/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg"
            alt="Lions in their natural savanna habitat"
            className="habitat-page__image"
          />
          <div className="habitat-page__image-overlay">
            <h2 className="habitat-page__image-title">The African Savanna</h2>
            <p className="habitat-page__image-description">
              Lions' primary habitat across Sub-Saharan Africa
            </p>
          </div>
        </div>

        <div className="habitat-page__content">
          {habitatSections.map((section, index) => (
            <div
              key={section.id}
              className={`habitat-page__section ${visibleSections.includes(index) ? 'habitat-page__section--visible' : ''}`}
              ref={el => sectionsRef.current[index] = el}
              data-index={index}
            >
              <div className="habitat-page__section-visual">
                <div className="habitat-page__section-icon">
                  {section.icon}
                </div>
                <div className="habitat-page__section-content">
                  <h3 className="habitat-page__section-title">{section.title}</h3>
                  <p className="habitat-page__section-text">{section.content}</p>
                  <div className="habitat-page__section-emoji">{section.visual}</div>
                </div>
              </div>
              <img
                src={section.image}
                alt={section.title}
                className="habitat-page__section-image"
              />
            </div>
          ))}
        </div>

        <div className="habitat-page__map-section">
          <h3 className="habitat-page__map-title">Lion Distribution Map</h3>
          <div className="habitat-page__map-placeholder">
            <div className="habitat-page__map-content">
              <h4>Current Lion Populations:</h4>
              <ul className="habitat-page__population-list">
                <li><strong>Sub-Saharan Africa:</strong> Primary population (~20,000 lions)</li>
                <li><strong>Gir Forest, India:</strong> Asiatic lions (~600 lions)</li>
                <li><strong>Historical Range:</strong> Once found across Africa, Asia, and Europe</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="habitat-page__conservation">
          <h3 className="habitat-page__conservation-title">Habitat Conservation</h3>
          <div className="habitat-page__conservation-grid">
            <div className="habitat-page__conservation-item">
              <h4>Threats to Lion Habitat</h4>
              <ul>
                <li>Human encroachment and development</li>
                <li>Agricultural expansion</li>
                <li>Climate change affecting prey availability</li>
                <li>Habitat fragmentation</li>
              </ul>
            </div>
            <div className="habitat-page__conservation-item">
              <h4>Conservation Efforts</h4>
              <ul>
                <li>Protected national parks and reserves</li>
                <li>Wildlife corridors connecting habitats</li>
                <li>Community-based conservation programs</li>
                <li>Anti-poaching initiatives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habitat;
