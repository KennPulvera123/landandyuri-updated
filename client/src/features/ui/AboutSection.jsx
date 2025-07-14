import React from 'react';

const AboutSection = () => {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="animated-section-title">About Lance Yuri Kids SPOT Center 💝</h2>
            <p>
              <strong>Lance Yuri Kids SPOT Center is a pediatric center for children with special needs.</strong> 
              Our goals are: To provide a quality therapy service that assists the child, as a whole, to achieve 
              the highest level of skills possible within the scope of their cognitive and physical function. 
              To educate and inform the adults involved with these children to improved understanding and 
              acceptance of their unique abilities and challenges.
            </p>
            
            <div className="about-features">
              <div className="about-feature magic-feature">
                <i className="fas fa-award"></i>
                <div>
                  <h4>15+ Years of Excellence ⭐</h4>
                  <p>Serving the community since 2009 with qualified and experienced therapists</p>
                </div>
              </div>
              <div className="about-feature magic-feature">
                <i className="fas fa-heart heart-pulse"></i>
                <div>
                  <h4>Compassionate Care 💖</h4>
                  <p>We provide supportive and nurturing environment for every child</p>
                </div>
              </div>
              <div className="about-feature magic-feature">
                <i className="fas fa-chart-line"></i>
                <div>
                  <h4>Evidence-Based Practice 📊</h4>
                  <p>Our treatments are based on the latest research and best practices</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="about-card magic-about-card">
              <h3>Our Commitment 🌟</h3>
              <p>
                Every child deserves the opportunity to reach their full potential. We are committed to 
                providing quality therapy services that make a meaningful difference in children's lives 
                and their families.
              </p>
              <div className="commitment-decorations">
                <span className="commitment-icon">🎯</span>
                <span className="commitment-icon">💪</span>
                <span className="commitment-icon">🌈</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 