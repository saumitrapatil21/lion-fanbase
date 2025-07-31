import React, { useEffect, useRef, useState } from 'react';

const Classification = () => {
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

  const taxonomyLevels = [
    { level: 'Kingdom', value: 'Animalia', description: 'Multicellular organisms that consume organic material' },
    { level: 'Phylum', value: 'Chordata', description: 'Animals with a spinal cord or notochord' },
    { level: 'Class', value: 'Mammalia', description: 'Warm-blooded vertebrates with hair and mammary glands' },
    { level: 'Order', value: 'Carnivora', description: 'Meat-eating mammals with specialized teeth' },
    { level: 'Family', value: 'Felidae', description: 'Cat family with retractable claws and keen senses' },
    { level: 'Genus', value: 'Panthera', description: 'Large cats capable of roaring' },
    { level: 'Species', value: 'P. leo', description: 'The lion species' }
  ];

  const subspecies = [
    {
      name: 'Panthera leo leo',
      commonName: 'Northern Lion',
      description: 'Includes both African and Asiatic lions as subspecies',
      status: 'Vulnerable',
      subgroups: [
        'Barbary lion (extinct in wild)',
        'Asiatic lion (small wild population in India)'
      ]
    },
    {
      name: 'Panthera leo melanochaita',
      commonName: 'Southern Lion',
      description: 'Found in eastern and southern Africa',
      status: 'Vulnerable',
      subgroups: [
        'East African lion',
        'Southern African lion'
      ]
    }
  ];

  return (
    <div className="classification-page">
      <div className="classification-page__container">
        <div className="classification-page__header">
          <h1 className="classification-page__title">🔬 🦁 📚</h1>
          <p className="classification-page__subtitle">
            🧬 + 📖 = 🤓 Smart Facts!
          </p>
        </div>

        <div className="classification-page__visual-section">
          <div className="content-page__image-gallery">
            <div className="content-page__gallery-item">
              <img
                src="/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg"
                alt="Male lion showing scientific features"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">👑 Male Lion = Panthera leo!</div>
            </div>
            <div className="content-page__gallery-item">
              <img
                src="/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg"
                alt="Female lion showing scientific features"
                className="content-page__gallery-image"
              />
              <div className="content-page__gallery-caption">👸 Female Lion = Panthera leo!</div>
            </div>
          </div>
        </div>

        <div className="classification-page__scientific-name">
          <div className="classification-page__name-card">
            <h2 className="classification-page__scientific-title">🔬 Panthera leo 📚</h2>
            <p className="classification-page__common-name">🦁 Lion's Science Name! 🌟</p>
            <p className="classification-page__authority">📖 Smart people named it in 1758!</p>
          </div>
        </div>

        <div className="classification-page__taxonomy">
          <h3 className="classification-page__section-title">Taxonomic Hierarchy</h3>
          <div className="classification-page__taxonomy-tree">
            {taxonomyLevels.map((item, index) => (
              <div
                key={item.level}
                className={`classification-page__taxonomy-level ${visibleSections.includes(index) ? 'classification-page__taxonomy-level--visible' : ''}`}
                ref={el => sectionsRef.current[index] = el}
                data-index={index}
              >
                <div className="classification-page__taxonomy-connector"></div>
                <div className="classification-page__taxonomy-content">
                  <div className="classification-page__taxonomy-level-name">{item.level}</div>
                  <div className="classification-page__taxonomy-value">{item.value}</div>
                  <div className="classification-page__taxonomy-description">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="classification-page__subspecies">
          <h3 className="classification-page__section-title">Subspecies</h3>
          <div className="classification-page__subspecies-grid">
            {subspecies.map((sub, index) => (
              <div
                key={sub.name}
                className={`classification-page__subspecies-card ${visibleSections.includes(index + 10) ? 'classification-page__subspecies-card--visible' : ''}`}
                ref={el => sectionsRef.current[index + 10] = el}
                data-index={index + 10}
              >
                <h4 className="classification-page__subspecies-name">{sub.name}</h4>
                <h5 className="classification-page__subspecies-common">{sub.commonName}</h5>
                <p className="classification-page__subspecies-description">{sub.description}</p>
                <div className="classification-page__subspecies-status">
                  <span className="classification-page__status-label">Conservation Status:</span>
                  <span className="classification-page__status-value">{sub.status}</span>
                </div>
                <div className="classification-page__subspecies-groups">
                  <h6>Includes:</h6>
                  <ul>
                    {sub.subgroups.map((group, idx) => (
                      <li key={idx}>{group}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="classification-page__evolution">
          <h3 className="classification-page__section-title">Evolutionary History</h3>
          <div className="classification-page__evolution-content">
            <div className="classification-page__evolution-timeline">
              <div className="classification-page__timeline-item">
                <div className="classification-page__timeline-date">~25 million years ago</div>
                <div className="classification-page__timeline-event">Early felids evolve</div>
              </div>
              <div className="classification-page__timeline-item">
                <div className="classification-page__timeline-date">~10.8 million years ago</div>
                <div className="classification-page__timeline-event">Panthera lineage diverges</div>
              </div>
              <div className="classification-page__timeline-item">
                <div className="classification-page__timeline-date">~4.5 million years ago</div>
                <div className="classification-page__timeline-event">Lion lineage separates from leopards</div>
              </div>
              <div className="classification-page__timeline-item">
                <div className="classification-page__timeline-date">~1.9 million years ago</div>
                <div className="classification-page__timeline-event">Modern lion species emerges</div>
              </div>
            </div>
          </div>
        </div>

        <div className="classification-page__related-species">
          <h3 className="classification-page__section-title">Related Species in Panthera</h3>
          <div className="classification-page__related-grid">
            <div className="classification-page__related-item">
              <h4>Tiger (P. tigris)</h4>
              <p>Largest living cat species</p>
            </div>
            <div className="classification-page__related-item">
              <h4>Leopard (P. pardus)</h4>
              <p>Most widespread of big cats</p>
            </div>
            <div className="classification-page__related-item">
              <h4>Jaguar (P. onca)</h4>
              <p>Largest cat in the Americas</p>
            </div>
            <div className="classification-page__related-item">
              <h4>Snow Leopard (P. uncia)</h4>
              <p>Mountain specialist of Central Asia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classification;
