import React, { useEffect, useRef, useState } from 'react';

const Diet = () => {
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

  const preyCategories = [
    {
      category: 'Primary Prey',
      icon: '🦓',
      description: 'Medium to large ungulates - main food source',
      animals: [
        { name: 'Zebras', frequency: 'Very Common', weight: '200-450 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Zebra' },
        { name: 'Wildebeest', frequency: 'Very Common', weight: '150-250 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Wildebeest' },
        { name: 'Buffalo', frequency: 'Common', weight: '300-900 kg', wikiUrl: 'https://en.wikipedia.org/wiki/African_buffalo' },
        { name: 'Antelopes', frequency: 'Common', weight: '20-300 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Antelope' }
      ]
    },
    {
      category: 'Secondary Prey',
      icon: '🦌',
      description: 'Smaller animals hunted when available',
      animals: [
        { name: 'Gazelles', frequency: 'Common', weight: '15-75 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Gazelle' },
        { name: 'Impalas', frequency: 'Common', weight: '40-75 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Impala' },
        { name: 'Warthogs', frequency: 'Occasional', weight: '50-150 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Common_warthog' },
        { name: 'Hares', frequency: 'Rare', weight: '1-5 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Hare' }
      ]
    },
    {
      category: 'Opportunistic Feeding',
      icon: '🍖',
      description: 'Scavenged or occasional prey',
      animals: [
        { name: 'Carrion', frequency: 'When Available', weight: 'Variable', wikiUrl: 'https://en.wikipedia.org/wiki/Carrion' },
        { name: 'Rodents', frequency: 'Rare', weight: '0.1-2 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Rodent' },
        { name: 'Birds', frequency: 'Rare', weight: '0.1-15 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Bird' },
        { name: 'Reptiles', frequency: 'Very Rare', weight: '0.1-50 kg', wikiUrl: 'https://en.wikipedia.org/wiki/Reptile' }
      ]
    }
  ];

  const huntingBehaviors = [
    {
      title: 'Cooperative Hunting',
      description: 'Lionesses work together in coordinated attacks',
      strategies: [
        'Surround and ambush tactics',
        'One lioness drives prey toward others',
        'Silent stalking through tall grass',
        'Coordinated timing for maximum success'
      ]
    },
    {
      title: 'Nocturnal Activity',
      description: 'Most hunting occurs during cooler hours',
      strategies: [
        'Hunt primarily at dawn and dusk',
        'Use darkness for cover',
        'Better night vision than prey',
        'Cooler temperatures conserve energy'
      ]
    },
    {
      title: 'Scavenging',
      description: 'Lions will take advantage of available carrion',
      strategies: [
        'Steal kills from other predators',
        'Follow vultures to carcasses',
        'Opportunistic feeding behavior',
        'Less energy expenditure than hunting'
      ]
    }
  ];

  const consumptionData = [
    {
      category: 'Single Meal Capacity',
      icon: '🍽️',
      data: [
        { label: 'Male Lions', value: 'Up to 25 kg (quarter of body weight)' },
        { label: 'Female Lions', value: 'Up to 18 kg' },
        { label: 'Feeding Duration', value: '2-4 hours per meal' }
      ]
    },
    {
      category: 'Daily Requirements',
      icon: '📊',
      data: [
        { label: 'Male Daily Intake', value: '7-10 kg (15-22 lbs)' },
        { label: 'Female Daily Intake', value: '5-8.5 kg (11-19 lbs)' },
        { label: 'Hunting Success Rate', value: '20-25% of attempts' }
      ]
    },
    {
      category: 'Feeding Patterns',
      icon: '⏰',
      data: [
        { label: 'Feast or Famine', value: 'Can go 3-4 days without eating' },
        { label: 'Gorging Behavior', value: 'Eat large amounts when available' },
        { label: 'Pride Hierarchy', value: 'Males eat first, then females and cubs' }
      ]
    }
  ];

  return (
    <div className="diet-page">
      <div className="diet-page__container">
        <div className="diet-page__header">
          <h1 className="diet-page__title">🍖 🦁 🥩</h1>
          <p className="diet-page__subtitle">
            🦁 ➡️ 🍖 ➡️ 😋
          </p>
        </div>

        <div className="diet-page__overview">
          <div className="diet-page__overview-content">
            <h2 className="diet-page__overview-title">👑 Super Hunters! 🎯</h2>
            <div className="diet-page__visual-facts">
              <div className="diet-page__visual-fact">
                <span className="diet-page__fact-emoji">🦁</span>
                <span className="diet-page__fact-arrow">➡️</span>
                <span className="diet-page__fact-emoji">🦓</span>
                <span className="diet-page__fact-text">Hunt zebras!</span>
              </div>
              <div className="diet-page__visual-fact">
                <span className="diet-page__fact-emoji">👥</span>
                <span className="diet-page__fact-arrow">➡️</span>
                <span className="diet-page__fact-emoji">🎯</span>
                <span className="diet-page__fact-text">Work together!</span>
              </div>
              <div className="diet-page__visual-fact">
                <span className="diet-page__fact-emoji">🌙</span>
                <span className="diet-page__fact-arrow">➡️</span>
                <span className="diet-page__fact-emoji">🏃‍♀️</span>
                <span className="diet-page__fact-text">Hunt at night!</span>
              </div>
            </div>
          </div>
          <img
            src="/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg"
            alt="Lioness hunting in the wild"
            className="diet-page__overview-image"
          />
        </div>

        <div className="diet-page__prey-categories">
          <h3 className="diet-page__section-title">Prey Categories</h3>
          {preyCategories.map((category, index) => (
            <div
              key={category.category}
              className={`diet-page__prey-section ${visibleSections.includes(index) ? 'diet-page__prey-section--visible' : ''}`}
              ref={el => sectionsRef.current[index] = el}
              data-index={index}
            >
              <div className="diet-page__prey-header">
                <span className="diet-page__prey-icon">{category.icon}</span>
                <div>
                  <h4 className="diet-page__prey-title">{category.category}</h4>
                  <p className="diet-page__prey-description">{category.description}</p>
                </div>
              </div>
              <div className="diet-page__prey-grid">
                {category.animals.map((animal, idx) => (
                  <div key={idx} className="diet-page__prey-item">
                    <div className="diet-page__prey-header-item">
                      <h5 className="diet-page__prey-name">{animal.name}</h5>
                      <a
                        href={animal.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="diet-page__prey-link"
                        title={`Learn more about ${animal.name} on Wikipedia`}
                      >
                        🔗
                      </a>
                    </div>
                    <div className="diet-page__prey-details">
                      <span className="diet-page__prey-frequency">{animal.frequency}</span>
                      <span className="diet-page__prey-weight">{animal.weight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="diet-page__hunting-behavior">
          <h3 className="diet-page__section-title">Hunting Strategies</h3>
          <div className="diet-page__hunting-grid">
            {huntingBehaviors.map((behavior, index) => (
              <div
                key={behavior.title}
                className={`diet-page__hunting-card ${visibleSections.includes(index + 10) ? 'diet-page__hunting-card--visible' : ''}`}
                ref={el => sectionsRef.current[index + 10] = el}
                data-index={index + 10}
              >
                <h4 className="diet-page__hunting-title">{behavior.title}</h4>
                <p className="diet-page__hunting-description">{behavior.description}</p>
                <ul className="diet-page__hunting-strategies">
                  {behavior.strategies.map((strategy, idx) => (
                    <li key={idx}>{strategy}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="diet-page__consumption">
          <h3 className="diet-page__section-title">Eating Patterns & Consumption</h3>
          <div className="diet-page__consumption-grid">
            {consumptionData.map((section, index) => (
              <div
                key={section.category}
                className={`diet-page__consumption-card ${visibleSections.includes(index + 20) ? 'diet-page__consumption-card--visible' : ''}`}
                ref={el => sectionsRef.current[index + 20] = el}
                data-index={index + 20}
              >
                <div className="diet-page__consumption-header">
                  <span className="diet-page__consumption-icon">{section.icon}</span>
                  <h4 className="diet-page__consumption-title">{section.category}</h4>
                </div>
                <div className="diet-page__consumption-data">
                  {section.data.map((item, idx) => (
                    <div key={idx} className="diet-page__consumption-item">
                      <span className="diet-page__consumption-label">{item.label}:</span>
                      <span className="diet-page__consumption-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="diet-page__facts">
          <h3 className="diet-page__section-title">Fascinating Diet Facts</h3>
          <div className="diet-page__facts-grid">
            <div className="diet-page__fact-card">
              <h4>🎯 Hunting Success</h4>
              <p>Lions have a 20-25% hunting success rate, making teamwork essential for survival</p>
            </div>
            <div className="diet-page__fact-card">
              <h4>👥 Team Hunters</h4>
              <p>Lionesses do 85-90% of the hunting while males primarily defend territory</p>
            </div>
            <div className="diet-page__fact-card">
              <h4>🍖 Massive Meals</h4>
              <p>A male lion can eat up to 25kg in one sitting - that's like eating 100 hamburgers!</p>
            </div>
            <div className="diet-page__fact-card">
              <h4>⏰ Patient Predators</h4>
              <p>Lions can go 3-4 days without eating, then gorge when a kill is made</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;
