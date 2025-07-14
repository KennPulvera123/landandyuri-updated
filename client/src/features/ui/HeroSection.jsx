import React from 'react';

const HeroSection = ({ onBookClick }) => {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title animated-title">
              Pediatric Center for Children with 
              <span className="colorful-text"> Special Needs</span> 
              <span className="title-emoji">🌟</span>
            </h1>
            <p className="hero-subtitle">
              Lance Yuri Kids SPOT Center concentrates on the growth and development of children. 
              As with "Lance Yuri" you cannot build a complex structure without a solid foundation. 
              Before a child walks, they must first learn to crawl, before they write they must first learn to sit up.
            </p>
            
            <div className="hero-features">
              <div className="hero-feature magic-card">
                <i className="fas fa-award"></i>
                <span>15+ Years Experience</span>
              </div>
              <div className="hero-feature magic-card">
                <i className="fas fa-clinic-medical"></i>
                <span>Pediatric Clinic</span>
              </div>
              <div className="hero-feature magic-card">
                <i className="fas fa-user-md"></i>
                <span>Multi-Disciplinary Team</span>
              </div>
              <div className="hero-feature magic-card">
                <i className="fas fa-graduation-cap"></i>
                <span>Early Intervention</span>
              </div>
            </div>

            <div className="hero-buttons">
              <button className="btn-primary magic-button-large" onClick={onBookClick}>
                <i className="fas fa-calendar-plus"></i>
                <span>Schedule Assessment</span>
                <div className="button-rainbow"></div>
              </button>
              <a href="#services" className="btn-secondary bounce-hover">
                <i className="fas fa-info-circle"></i>
                Learn More
              </a>
            </div>
          </div>
          
          <div className="hero-image">
            {/* Founders Image */}
            <div className="founders-image-container">
              <img 
                src="/images/founders-lance-yuri.png" 
                alt="Lance and Yuri - Founders" 
                className="founders-image"
                onError={handleImageError}
              />
              <div className="image-placeholder" style={{ display: 'none' }}>
                <div className="placeholder-content">
                  <i className="fas fa-users" style={{ fontSize: '48px', color: 'var(--primary-orange)', marginBottom: '10px' }}></i>
                  <h3 style={{ color: 'var(--primary-orange)', margin: '0', fontSize: '18px' }}>Lance & Yuri</h3>
                  <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>Founders</p>
                </div>
              </div>
            </div>
            
            <div className="info-card magic-info-card">
              <h3>What Sets Us Apart 🌈</h3>
              <div className="info-list">
                <div className="info-item slide-in-right">
                  <i className="fas fa-award"></i>
                  <span>15+ Years of Trusted Experience</span>
                </div>
                <div className="info-item slide-in-right">
                  <i className="fas fa-certificate"></i>
                  <span>Comprehensive Assessment</span>
                </div>
                <div className="info-item slide-in-right">
                  <i className="fas fa-child"></i>
                  <span>Child-Centered Approach</span>
                </div>
                <div className="info-item slide-in-right">
                  <i className="fas fa-users"></i>
                  <span>Family Collaboration</span>
                </div>
                <div className="info-item slide-in-right">
                  <i className="fas fa-chart-line"></i>
                  <span>Progress Monitoring</span>
                </div>
              </div>
              <div className="card-decorations">
                <span className="decoration-star">⭐</span>
                <span className="decoration-heart">💖</span>
                <span className="decoration-smile">😊</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 