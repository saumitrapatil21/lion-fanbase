import React, { useEffect, useRef, useState } from 'react';

const Behavior = () => {
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

  const behaviorSections = [
    {
      id: 'hunting',
      title: 'How Lions Get Food',
      icon: '🎯',
      content: 'Lions are carnivorous predators, primarily hunting large herbivores such as zebras, wildebeests, and antelope. Female lions do most of the group hunting, using coordination and stealth. Lions also scavenge and will take food from other predators.',
      details: [
        'Cooperative hunting in groups',
        'Primarily hunt at night and dawn/dusk',
        'Lionesses are the primary hunters',
        'Use stealth and teamwork to ambush prey',
        'Will scavenge when opportunities arise'
      ]
    },
    {
      id: 'protection',
      title: 'Protection from Predators',
      icon: '🛡️',
      content: 'Adult lions have few natural predators. Cubs may fall prey to hyenas, leopards, or other lions. They rely on group strength (pride) and intimidation tactics (roaring, posturing) to protect themselves.',
      details: [
        'Group defense through pride cooperation',
        'Intimidation through roaring and posturing',
        'Males protect territory and pride',
        'Cubs are vulnerable to other predators',
        'Strength in numbers strategy'
      ]
    },
    {
      id: 'sleeping',
      title: 'Sleeping Habits',
      icon: '😴',
      content: 'Lions are nocturnal and crepuscular, meaning most active at night or twilight. They sleep or rest for 16–20 hours per day, conserving energy for hunting.',
      details: [
        'Sleep 16-20 hours per day',
        'Most active during night and twilight',
        'Energy conservation strategy',
        'Rest in shade during hot days',
        'Social sleeping in groups'
      ]
    }
  ];

  const socialBehaviors = [
    {
      title: 'Pride Structure',
      description: 'Lions live in complex social groups called prides',
      behaviors: [
        'Related females form the core of the pride',
        '1-4 dominant males control territory',
        'Cubs are raised communally',
        'Cooperative hunting and defense',
        'Territory size varies with prey availability'
      ]
    },
    {
      title: 'Communication',
      description: 'Lions use various methods to communicate',
      behaviors: [
        'Roaring for long-distance communication',
        'Scent marking to establish territory',
        'Body language and facial expressions',
        'Grooming for social bonding',
        'Vocalizations like grunts and chuffs'
      ]
    },
    {
      title: 'Territorial Behavior',
      description: 'Lions are highly territorial animals',
      behaviors: [
        'Males patrol and defend territory',
        'Scent marking with urine and feces',
        'Roaring to warn intruders',
        'Physical confrontations when necessary',
        'Territory can span 20-400 square kilometers'
      ]
    }
  ];

  const dailyActivities = [
    { time: '6:00 AM', activity: 'Dawn patrol and hunting', intensity: 'High' },
    { time: '8:00 AM', activity: 'Rest and grooming', intensity: 'Low' },
    { time: '12:00 PM', activity: 'Midday rest in shade', intensity: 'Very Low' },
    { time: '4:00 PM', activity: 'Social interactions', intensity: 'Medium' },
    { time: '6:00 PM', activity: 'Evening hunt preparation', intensity: 'High' },
    { time: '8:00 PM', activity: 'Night hunting', intensity: 'Very High' },
    { time: '12:00 AM', activity: 'Continued hunting/patrol', intensity: 'High' },
    { time: '3:00 AM', activity: 'Rest between hunts', intensity: 'Low' }
  ];

  return (
    <div className="behavior-page">
      <div className="behavior-page__container">
        <div className="behavior-page__header">
          <h1 className="behavior-page__title">🎭 🦁 🎮</h1>
          <p className="behavior-page__subtitle">
            🦁 ➡️ 🗣️ + 🎮 + 🤝
          </p>
        </div>

        <div className="behavior-page__hero">
          <img 
            src="/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg"
            alt="Lions displaying social behavior in their pride"
            className="behavior-page__hero-image"
          />
          <div className="behavior-page__hero-overlay">
            <h2>The Social Kings</h2>
            <p>Lions are the only truly social big cats, living in complex family groups</p>
          </div>
        </div>

        <div className="behavior-page__main-behaviors">
          <h3 className="behavior-page__section-title">Primary Behaviors</h3>
          {behaviorSections.map((section, index) => (
            <div
              key={section.id}
              className={`behavior-page__behavior-section ${visibleSections.includes(index) ? 'behavior-page__behavior-section--visible' : ''}`}
              ref={el => sectionsRef.current[index] = el}
              data-index={index}
            >
              <div className="behavior-page__behavior-header">
                <span className="behavior-page__behavior-icon">{section.icon}</span>
                <h4 className="behavior-page__behavior-title">{section.title}</h4>
              </div>
              <p className="behavior-page__behavior-content">{section.content}</p>
              <ul className="behavior-page__behavior-details">
                {section.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="behavior-page__social-structure">
          <h3 className="behavior-page__section-title">Social Structure & Communication</h3>
          <div className="behavior-page__social-grid">
            {socialBehaviors.map((behavior, index) => (
              <div
                key={behavior.title}
                className={`behavior-page__social-card ${visibleSections.includes(index + 10) ? 'behavior-page__social-card--visible' : ''}`}
                ref={el => sectionsRef.current[index + 10] = el}
                data-index={index + 10}
              >
                <h4 className="behavior-page__social-title">{behavior.title}</h4>
                <p className="behavior-page__social-description">{behavior.description}</p>
                <ul className="behavior-page__social-list">
                  {behavior.behaviors.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="behavior-page__daily-schedule">
          <h3 className="behavior-page__section-title">Daily Activity Pattern</h3>
          <div className="behavior-page__schedule-chart">
            {dailyActivities.map((activity, index) => (
              <div
                key={activity.time}
                className={`behavior-page__activity-item ${visibleSections.includes(index + 20) ? 'behavior-page__activity-item--visible' : ''}`}
                ref={el => sectionsRef.current[index + 20] = el}
                data-index={index + 20}
              >
                <div className="behavior-page__activity-time">{activity.time}</div>
                <div className="behavior-page__activity-bar">
                  <div 
                    className={`behavior-page__activity-fill behavior-page__activity-fill--${activity.intensity.toLowerCase().replace(' ', '-')}`}
                  ></div>
                </div>
                <div className="behavior-page__activity-name">{activity.activity}</div>
                <div className="behavior-page__activity-intensity">{activity.intensity}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="behavior-page__visual-gallery">
          <h3 className="behavior-page__gallery-title">📸 See How Lions Act! 🎭</h3>
          <div className="content-page__image-gallery">
            <div className="content-page__gallery-item">
              <img
                src="/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg"
                alt="Lions playing together"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">🎮 Playing Together!</div>
            </div>
            <div className="content-page__gallery-item">
              <img
                src="/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg"
                alt="Lion roaring"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">🔊 ROAR!</div>
            </div>
            <div className="content-page__gallery-item">
              <img
                src="/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg"
                alt="Lion hunting"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">🎯 Hunting!</div>
            </div>
          </div>
        </div>

        <div className="behavior-page__behavioral-facts">
          <h3 className="behavior-page__section-title">🤯 Cool Facts! 🌟</h3>
          <div className="behavior-page__facts-grid">
            <div className="behavior-page__fact-item">
              <h4>🦁 Big Family</h4>
              <p>10-15 lions = 👨‍👩‍👧‍👦 Big family!</p>
            </div>
            <div className="behavior-page__fact-item">
              <h4>🗣️ Super Loud</h4>
              <p>8 km away = 📢 Really far!</p>
            </div>
            <div className="behavior-page__fact-item">
              <h4>👑 Boss Time</h4>
              <p>2-4 years = ⏰ Being the boss!</p>
            </div>
            <div className="behavior-page__fact-item">
              <h4>🤝 Team Work</h4>
              <p>👸 Girls work together = 💪</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Behavior;
