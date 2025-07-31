import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { path: '/', label: '🏠 Home' },
    { path: '/gallery', label: '📸 Pictures' },
    { path: '/diet', label: '🍖 Food' },
    { path: '/habitat', label: '🏠 Where They Live' },
    { path: '/classification', label: '🔬 Science' },
    { path: '/anatomy', label: '💪 Body Parts' },
    { path: '/behavior', label: '🎭 How They Act' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" aria-label="Team Lion Home">
          <span className="header__logo-icon">🦁</span>
          <span className="header__logo-text">Team Lion</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className={`header__nav-list ${isMenuOpen ? 'header__nav-list--open' : ''}`}>
            {navigationItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <Link 
                  to={item.path} 
                  className={`header__nav-link ${location.pathname === item.path ? 'header__nav-link--active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
