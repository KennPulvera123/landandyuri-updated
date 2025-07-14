import React from 'react';

const ServicesSection = ({ onBookClick }) => {
  const services = [
    {
      icon: 'fa-comments',
      title: 'Speech Therapy Program 🗣️',
      description: 'Our speech therapy program addresses communication challenges through evidence-based interventions. We focus on articulation disorders, voice disorders, and language delays using engaging activities like vocal practice, storytelling, and interactive sessions.',
      benefits: [
        'Articulation disorder correction',
        'Voice disorder treatment',
        'Language delay remediation',
        'Social communication skills building'
      ],
      sparkles: ['🗨️', '💬']
    },
    {
      icon: 'fa-hands-helping',
      title: 'Occupational Therapy Program 🖐️',
      description: 'Our occupational therapy program uses purposeful activities to enhance children\'s daily living skills and independence. We help children develop fine motor skills, sensory processing abilities, and cognitive functions for school, play, and life activities.',
      benefits: [
        'Fine motor skills development',
        'Age-appropriate self-help skills',
        'Sensory processing improvement',
        'School readiness enhancement'
      ],
      sparkles: ['✨', '⭐']
    },
    {
      icon: 'fa-brain',
      title: 'Behavioral Therapy 🧠',
      description: 'Our behavioral therapy program provides evidence-based interventions to help children develop appropriate behaviors and emotional regulation. Using ABA principles and positive reinforcement, we create supportive environments that promote learning and growth.',
      benefits: [
        'Positive behavior development',
        'Social skills training',
        'Emotional regulation skills',
        'Family support and training'
      ],
      sparkles: ['🧠', '💡']
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Early Intervention Program 📚',
      description: 'Our Early Intervention Program provides family-centered services for infants and toddlers (ages 0-3) with developmental delays. We focus on maximizing each child\'s potential during critical early years through individualized plans and collaborative care.',
      benefits: [
        'Family-centered early intervention',
        'Developmental milestone tracking',
        'Individualized therapy plans',
        'Parent education and training'
      ],
      sparkles: ['🎓', '📚']
    }
  ];

  const consultations = [
    {
      icon: 'fa-stethoscope',
      title: 'Developmental Pediatrician 👶',
      description: 'Provides medical services to infants, children, and adolescents. Trained in overall growth and development, they are often the first point of contact for developmental concerns.',
      sparkles: ['🩺', '⭐']
    },
    {
      icon: 'fa-hands-helping',
      title: 'Occupational Therapist 🖐️',
      description: 'Provides assessment and treatment using specific, purposeful activities to prevent disability and promote independent function in all aspects of daily life.',
      sparkles: ['🖐️', '💫']
    },
    {
      icon: 'fa-graduation-cap',
      title: 'SPED Teachers 👩‍🏫',
      description: 'Provide specialized instruction using remedial techniques, individualized education programs (IEP), and early identification support to help children with specific learning disabilities.',
      sparkles: ['👩‍🏫', '📚']
    },
    {
      icon: 'fa-comments',
      title: 'Speech and Language Pathologist 🗣️',
      description: 'Specializes in communication disorders, providing assessment and treatment for speech articulation, language development, and communication skills enhancement.',
      sparkles: ['🗣️', '💬']
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="animated-section-title">Professional Consultation Team 👨‍⚕️</h2>
          <p>Our programs are delivered through consultation with a multi-disciplinary team of medical professionals and specialists</p>
        </div>
        
        <div className="consultation-grid">
          {consultations.map((consultation, index) => (
            <div key={index} className="consultation-card magic-service-card">
              <div className="service-icon">
                <i className={`fas ${consultation.icon}`}></i>
                <div className="icon-sparkles">
                  {consultation.sparkles.map((sparkle, i) => (
                    <span key={i} className="sparkle">{sparkle}</span>
                  ))}
                </div>
              </div>
              <h3>{consultation.title}</h3>
              <p>{consultation.description}</p>
            </div>
          ))}
        </div>
        
        <div className="section-header" style={{ marginTop: '60px' }}>
          <h2 className="animated-section-title">Our Programs & Services 🎯</h2>
          <p>We offer Early intervention and Developmental Programs along with professional consultation services delivered by a multi-disciplinary team of medical professionals and specialists</p>
        </div>
        
        <div className="services-grid-compact">
          {services.map((service, index) => (
            <div key={index} className="service-card magic-service-card compact">
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
                <div className="icon-sparkles">
                  {service.sparkles.map((sparkle, i) => (
                    <span key={i} className="sparkle">{sparkle}</span>
                  ))}
                </div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-benefits">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="benefit">{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 