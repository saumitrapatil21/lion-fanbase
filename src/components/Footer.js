import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/diet', label: 'Diet' },
    { path: '/habitat', label: 'Habitat' }
  ];

  const resourceLinks = [
    { path: '/classification', label: 'Classification' },
    { path: '/anatomy', label: 'Anatomy' },
    { path: '/behavior', label: 'Behavior' },
    { path: '/contact', label: 'Submit Photo' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/teamlion', 
      icon: '📘',
      ariaLabel: 'Visit our Facebook page'
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/teamlion', 
      icon: '📷',
      ariaLabel: 'Follow us on Instagram'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/teamlion', 
      icon: '🐦',
      ariaLabel: 'Follow us on Twitter'
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/teamlion', 
      icon: '📺',
      ariaLabel: 'Subscribe to our YouTube channel'
    }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section footer__section--brand">
            <Link to="/" className="footer__logo" aria-label="Team Lion Home">
              <span className="footer__logo-icon">🦁</span>
              <span className="footer__logo-text">Team Lion</span>
            </Link>
            <p className="footer__description">
              Your ultimate resource for discovering the majestic world of lions. 
              Dedicated to education, conservation, and celebrating these magnificent creatures.
            </p>
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                >
                  <span className="footer__social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Quick Links</h3>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.path} className="footer__link-item">
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Resources</h3>
            <ul className="footer__links">
              {resourceLinks.map((link) => (
                <li key={link.path} className="footer__link-item">
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Conservation</h3>
            <p className="footer__conservation-text">
              Support lion conservation efforts and help protect these magnificent creatures for future generations.
            </p>
            <Link to="/contact" className="footer__cta">
              Get Involved
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} Team Lion. All rights reserved.
            </p>
            <div className="footer__legal">
              <a href="/privacy" className="footer__legal-link">Privacy Policy</a>
              <a href="/terms" className="footer__legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
