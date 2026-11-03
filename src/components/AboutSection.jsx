import React from 'react';

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading scroll-reveal">
        <h2>About KLU Fresh</h2>
        <p>Your trusted campus &amp; city grocery delivery partner</p>
      </div>
      <div className="about-grid">
        <div className="about-card scroll-reveal stagger-0">
          <span className="about-icon">🌱</span>
          <h3>100% Farm Fresh</h3>
          <p>Directly sourced from trusted local farmers and organic certified growers every morning.</p>
        </div>
        <div className="about-card scroll-reveal stagger-2">
          <span className="about-icon">⚡</span>
          <h3>15-Minute Delivery</h3>
          <p>Superfast delivery to your room, hostel, or home across Vijayawada &amp; KL University.</p>
        </div>
        <div className="about-card scroll-reveal stagger-4">
          <span className="about-icon">💰</span>
          <h3>Honest Prices</h3>
          <p>Best daily deals, student discounts, and zero delivery fee on qualifying orders.</p>
        </div>
      </div>
    </section>
  );
}
