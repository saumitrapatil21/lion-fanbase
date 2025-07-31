import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ContentPreview = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  const contentSections = [
    {
      id: 'gallery',
      title: '📸 Pictures',
      description: '🦁📷😍',
      icon: '📸',
      path: '/gallery',
      color: '#D2691E',
      image: '/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg',
      heading: 'Photo Gallery'
    },
    {
      id: 'diet',
      title: '🍖 Food',
      description: '🦓🥩😋',
      icon: '🥩',
      path: '/diet',
      color: '#CD853F',
      image: '/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg',
      heading: 'What Lions Eat'
    },
    {
      id: 'habitat',
      title: '🏠 Home',
      description: '🌍🌿🏡',
      icon: '🌍',
      path: '/habitat',
      color: '#B8860B',
      image: '/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg',
      heading: 'Where Lions Live'
    },
    {
      id: 'classification',
      title: '🔬 Science',
      description: '🧬📚🤓',
      icon: '🔬',
      path: '/classification',
      color: '#8B4513',
      image: '/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg',
      heading: 'Lion Science Facts'
    },
    {
      id: 'anatomy',
      title: '💪 Body',
      description: '🦴💪🦷',
      icon: '🦴',
      path: '/anatomy',
      color: '#A0522D',
      image: '/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg',
      heading: 'Lion Body Parts'
    },
    {
      id: 'behavior',
      title: '🎭 Actions',
      description: '🗣️🎮🤝',
      icon: '🦁',
      path: '/behavior',
      color: '#D2691E',
      image: '/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg',
      heading: 'How Lions Act'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => [...new Set([...prev, cardIndex])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="content-preview" className="content-preview" aria-label="Content sections preview">
      <div className="content-preview__container">
        <div className="content-preview__header">
          <h2 className="content-preview__title">🌟🦁🎉</h2>
          <p className="content-preview__subtitle">
            👆👆👆
          </p>
        </div>

        <div className="content-preview__grid">
          {contentSections.map((section, index) => (
            <Link
              key={section.id}
              to={section.path}
              className={`content-preview__card ${visibleCards.includes(index) ? 'content-preview__card--visible' : ''}`}
              ref={el => cardsRef.current[index] = el}
              data-index={index}
              style={{ '--card-color': section.color }}
              aria-label={`Navigate to ${section.title} section`}
            >
              <div className="content-preview__card-image">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="content-preview__card-img"
                />
                <div className="content-preview__card-overlay">
                  <div className="content-preview__card-icon">
                    {section.icon}
                  </div>
                </div>
              </div>
              <div className="content-preview__card-content">
                <h3 className="content-preview__card-heading">{section.heading}</h3>
                <h4 className="content-preview__card-title">{section.title}</h4>
                <p className="content-preview__card-description">{section.description}</p>
                <div className="content-preview__card-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentPreview;
