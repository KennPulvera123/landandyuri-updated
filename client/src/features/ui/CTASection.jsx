import React from 'react';

const CTASection = ({ onBookClick }) => {
  return (
    <section id="booking" className="cta">
      <div className="container">
        <div className="cta-main-content">
          <div className="cta-left">
            <h2 className="animated-section-title">Ready to Begin Your Child's Therapy Journey? 🚀</h2>
            <p>
              Take the first step toward supporting your child's development. With <strong>over 15 years of experience</strong>, 
              our comprehensive assessment will help us understand your child's unique needs and create a personalized treatment plan.
            </p>
            <p className="cta-note">Our professionals will discuss treatment options and pricing during your consultation. 😊</p>
          </div>
          
          <div className="cta-right">
            <div className="cta-features-compact">
              <div className="cta-feature magic-cta-feature">
                <i className="fas fa-clipboard-check"></i>
                <span>Comprehensive Assessment</span>
              </div>
              <div className="cta-feature magic-cta-feature">
                <i className="fas fa-user-md"></i>
                <span>Expert Evaluation</span>
              </div>
              <div className="cta-feature magic-cta-feature">
                <i className="fas fa-calendar"></i>
                <span>Flexible Scheduling</span>
              </div>
            </div>
            
            <button className="btn-cta magic-cta-button" onClick={onBookClick}>
              <i className="fas fa-calendar-plus"></i>
              <span>Schedule Your Assessment</span>
              <div className="cta-rainbow"></div>
              <div className="cta-sparkles">
                <span className="sparkle">✨</span>
                <span className="sparkle">⭐</span>
                <span className="sparkle">🌟</span>
                <span className="sparkle">💫</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 