import React, { useState } from 'react';

const Header = ({ isAdmin = false, showBookingButton = true, onBookClick, user = null, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h2>🏠 Lance and Yuri Kids Spot Naga City</h2>
          {!isAdmin && <span className="experience-tag">✨ 15+ YEARS EXPERIENCE ✨</span>}
          {isAdmin && <span className="admin-badge">Admin</span>}
        </div>
        
        {!isAdmin ? (
          <>
            {/* Navigation Menu - Dropdown */}
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <a href="#home" className="nav-link">🏠 Home</a>
              </li>
              <li className="nav-item">
                <a href="#services" className="nav-link">🎯 Services</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">💝 About</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">📞 Contact</a>
              </li>
              {user && (
                <li className="nav-item user-info">
                  <span className="user-greeting">👋 Hi, {user.firstName}!</span>
                  <button className="logout-btn" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              )}
            </ul>
            
            {/* Right side controls - Always visible */}
            <div className="nav-controls">
              {showBookingButton && (
                <button className="nav-btn-external magic-button" onClick={onBookClick}>
                  <span className="btn-text">
                    {user ? '📅 Book Assessment' : '🔐 Login to Book'}
                  </span>
                  <div className="btn-sparkles">
                    <span className="sparkle">✨</span>
                    <span className="sparkle">⭐</span>
                    <span className="sparkle">💫</span>
                  </div>
                </button>
              )}
              <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          </>
        ) : (
          <div className="admin-nav-menu">
            <a href="/" className="nav-link">
              <i className="fas fa-home"></i> Main Site
            </a>
            <button id="adminLogoutBtn" className="nav-link logout-btn" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 