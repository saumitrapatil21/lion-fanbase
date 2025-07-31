import React, { useEffect, useRef, useState } from 'react';

const FunFacts = () => {
  const [visibleFacts, setVisibleFacts] = useState([]);
  const factsRef = useRef([]);

  const funFacts = [
    {
      id: 1,
      title: "🔊 ROAR!",
      fact: "5 miles away!",
      detail: "🦁 ➡️ 🔊 ➡️ 👂 (far far away!)",
      icon: "🔊"
    },
    {
      id: 2,
      title: "🦓 Hunt Zebras",
      fact: "Favorite food!",
      detail: "🦁 + 🦓 = 🍽️ Yummy!",
      icon: "🦓"
    },
    {
      id: 3,
      title: "👥 Work Together",
      fact: "Team hunting!",
      detail: "🦁🦁🦁 = Better hunters!",
      icon: "🤝"
    },
    {
      id: 4,
      title: "🌙 Hunt at Night",
      fact: "Dark time hunting!",
      detail: "🌙 + 🦁 = 🥩 Success!",
      icon: "🌙"
    },
    {
      id: 5,
      title: "💇‍♂️ Mane",
      fact: "Boys have fluffy hair!",
      detail: "Big mane = 💪 lion!",
      icon: "💪"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const factIndex = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleFacts(prev => [...new Set([...prev, factIndex])]);
            }, factIndex * 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    factsRef.current.forEach((fact) => {
      if (fact) observer.observe(fact);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="fun-facts" aria-label="Fun facts about lions">
      <div className="fun-facts__container">
        <div className="fun-facts__header">
          <h2 className="fun-facts__title">🤔 ❓ 🦁</h2>
          <p className="fun-facts__subtitle">
            🤯 WOW! 🌟
          </p>
        </div>

        <div className="fun-facts__grid">
          {funFacts.map((fact, index) => (
            <div
              key={fact.id}
              className={`fun-facts__card ${visibleFacts.includes(index) ? 'fun-facts__card--visible' : ''}`}
              ref={el => factsRef.current[index] = el}
              data-index={index}
            >
              <div className="fun-facts__card-icon">
                {fact.icon}
              </div>
              <h3 className="fun-facts__card-title">{fact.title}</h3>
              <p className="fun-facts__card-fact">{fact.fact}</p>
              <p className="fun-facts__card-detail">{fact.detail}</p>
            </div>
          ))}
        </div>

        <div className="fun-facts__featured-gallery">
          <h3 className="fun-facts__gallery-title">📸 🦁 😍</h3>
          <div className="fun-facts__gallery-grid">
            <div className="fun-facts__gallery-item">
              <img
                src="/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg"
                alt="Lion pride resting together in their natural habitat"
                loading="lazy"
              />
            </div>
            <div className="fun-facts__gallery-item">
              <img
                src="/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg"
                alt="Majestic male lion with golden mane"
                loading="lazy"
              />
            </div>
            <div className="fun-facts__gallery-item">
              <img
                src="/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg"
                alt="Lioness showcasing grace and power"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
