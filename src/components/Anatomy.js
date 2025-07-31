import React, { useEffect, useRef, useState } from 'react';

const Anatomy = () => {
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

  const anatomyData = [
    {
      category: 'Size & Weight',
      icon: '📏',
      items: [
        { label: 'Male Height', value: '1.2 meters at shoulder' },
        { label: 'Male Weight', value: '150–250 kg' },
        { label: 'Female Weight', value: '110–180 kg' },
        { label: 'Body Length', value: '1.5 to 2.5 meters' },
        { label: 'Tail Length', value: '1 meter' }
      ]
    },
    {
      category: 'Physical Characteristics',
      icon: '🦁',
      items: [
        { label: 'Mane', value: 'Males possess distinctive mane (varies with age/genetics)' },
        { label: 'Forelimbs', value: 'Strong and muscular for hunting' },
        { label: 'Paws', value: 'Large with retractable claws' },
        { label: 'Jaws', value: 'Powerful, adapted for hunting' },
        { label: 'Roar Range', value: 'Can be heard up to 8 km away' }
      ]
    },
    {
      category: 'Biological Systems',
      icon: '🫁',
      items: [
        { label: 'Respiration', value: 'Lungs via diaphragm (typical mammalian)' },
        { label: 'Heart Rate', value: '40-50 beats per minute (resting)' },
        { label: 'Body Temperature', value: '38-39°C (100-102°F)' },
        { label: 'Gestation', value: '110 days (approximately)' },
        { label: 'Dental Formula', value: '30 teeth total' }
      ]
    },
    {
      category: 'Lifespan',
      icon: '⏰',
      items: [
        { label: 'Wild Lifespan', value: '10–14 years' },
        { label: 'Captivity Lifespan', value: 'Up to 20 years' },
        { label: 'Sexual Maturity', value: '3-4 years' },
        { label: 'Prime Years', value: '5-10 years old' }
      ]
    }
  ];

  const adaptations = [
    {
      title: 'Hunting Adaptations',
      features: [
        'Binocular vision for depth perception',
        'Night vision 6x better than humans',
        'Powerful jaw muscles for killing bite',
        'Retractable claws for gripping prey',
        'Flexible spine for pouncing'
      ]
    },
    {
      title: 'Social Adaptations',
      features: [
        'Vocal cords capable of roaring',
        'Scent glands for territory marking',
        'Facial expressions for communication',
        'Body language signals',
        'Cooperative hunting instincts'
      ]
    },
    {
      title: 'Environmental Adaptations',
      features: [
        'Tawny coat for camouflage',
        'Heat regulation through panting',
        'Water conservation abilities',
        'Padded paws for silent stalking',
        'Excellent hearing and smell'
      ]
    }
  ];

  return (
    <div className="anatomy-page">
      <div className="anatomy-page__container">
        <div className="anatomy-page__header">
          <h1 className="anatomy-page__title">💪 🦁 🦴</h1>
          <p className="anatomy-page__subtitle">
            🦁 = 💪 + 🦷 + 👂 + 👁️
          </p>
        </div>

        <div className="anatomy-page__hero-section">
          <img 
            src="/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg"
            alt="Detailed view of a male lion showing anatomical features"
            className="anatomy-page__hero-image"
          />
          <div className="anatomy-page__hero-overlay">
            <h2>The Perfect Predator</h2>
            <p>Every aspect of lion anatomy is designed for survival and dominance</p>
          </div>
        </div>

        <div className="anatomy-page__data-grid">
          {anatomyData.map((section, index) => (
            <div
              key={section.category}
              className={`anatomy-page__data-section ${visibleSections.includes(index) ? 'anatomy-page__data-section--visible' : ''}`}
              ref={el => sectionsRef.current[index] = el}
              data-index={index}
            >
              <div className="anatomy-page__section-header">
                <span className="anatomy-page__section-icon">{section.icon}</span>
                <h3 className="anatomy-page__section-title">{section.category}</h3>
              </div>
              <div className="anatomy-page__data-list">
                {section.items.map((item, idx) => (
                  <div key={idx} className="anatomy-page__data-item">
                    <span className="anatomy-page__data-label">{item.label}:</span>
                    <span className="anatomy-page__data-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="anatomy-page__adaptations">
          <h3 className="anatomy-page__adaptations-title">Evolutionary Adaptations</h3>
          <div className="anatomy-page__adaptations-grid">
            {adaptations.map((adaptation, index) => (
              <div
                key={adaptation.title}
                className={`anatomy-page__adaptation-card ${visibleSections.includes(index + 10) ? 'anatomy-page__adaptation-card--visible' : ''}`}
                ref={el => sectionsRef.current[index + 10] = el}
                data-index={index + 10}
              >
                <h4 className="anatomy-page__adaptation-title">{adaptation.title}</h4>
                <ul className="anatomy-page__adaptation-list">
                  {adaptation.features.map((feature, idx) => (
                    <li key={idx} className="anatomy-page__adaptation-item">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="anatomy-page__comparison">
          <h3 className="anatomy-page__comparison-title">Size Comparison</h3>
          <div className="anatomy-page__comparison-chart">
            <div className="anatomy-page__comparison-item">
              <h4>Male Lion</h4>
              <div className="anatomy-page__size-bar anatomy-page__size-bar--male"></div>
              <span>150-250 kg</span>
            </div>
            <div className="anatomy-page__comparison-item">
              <h4>Female Lion</h4>
              <div className="anatomy-page__size-bar anatomy-page__size-bar--female"></div>
              <span>110-180 kg</span>
            </div>
            <div className="anatomy-page__comparison-item">
              <h4>Human (Average)</h4>
              <div className="anatomy-page__size-bar anatomy-page__size-bar--human"></div>
              <span>70 kg</span>
            </div>
          </div>
        </div>

        <div className="anatomy-page__visual-gallery">
          <h3 className="anatomy-page__gallery-title">📸 See Lion Body Parts! 🦁</h3>
          <div className="content-page__image-gallery">
            <div className="content-page__gallery-item">
              <img
                src="/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg"
                alt="Lion showing mane and face"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">💇‍♂️ Amazing Mane!</div>
            </div>
            <div className="content-page__gallery-item">
              <img
                src="/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg"
                alt="Lion showing body and muscles"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">💪 Strong Body!</div>
            </div>
            <div className="content-page__gallery-item">
              <img
                src="/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg"
                alt="Lions showing family structure"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">👨‍👩‍👧‍👦 Big Family!</div>
            </div>
          </div>
        </div>

        <div className="anatomy-page__facts">
          <h3 className="anatomy-page__facts-title">🤯 WOW Facts! 🌟</h3>
          <div className="anatomy-page__facts-grid">
            <div className="anatomy-page__fact-card">
              <h4>🦷 Super Bite!</h4>
              <p>650 PSI = 💪 Crush bones!</p>
            </div>
            <div className="anatomy-page__fact-card">
              <h4>👁️ Night Eyes!</h4>
              <p>6x better than humans! 🌙</p>
            </div>
            <div className="anatomy-page__fact-card">
              <h4>🏃‍♂️ Super Fast!</h4>
              <p>50 mph = 🚗 Car speed!</p>
            </div>
            <div className="anatomy-page__fact-card">
              <h4>👂 Super Hearing!</h4>
              <p>Hear 2 km away! 📡</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anatomy;
