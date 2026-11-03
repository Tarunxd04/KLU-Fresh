import React from 'react';

export function Hero({ onShopNow, onViewDeals }) {
  return (
    <section className="hero" id="home">
      <div className="hero-text hero-reveal-left">
        <p className="hero-eyebrow">Delivering freshness since today 🌱</p>
        <h1>Fresh groceries, delivered to your doorstep.</h1>
        <p className="hero-desc">Shop everyday essentials at great prices with KLU Fresh.</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" id="shopNowBtn" onClick={onShopNow}>
            Shop Now
          </button>
          <button className="btn btn-outline" id="viewDealsBtn" onClick={onViewDeals}>
            View Deals
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <strong>15 min</strong>
            <span>Fast delivery</span>
          </div>
          <div>
            <strong>200+</strong>
            <span>Daily essentials</span>
          </div>
          <div>
            <strong>4.8★</strong>
            <span>Customer rating</span>
          </div>
        </div>
      </div>

      <div className="hero-visual hero-reveal-right">
        <div className="offer-badge">
          Up to
          <br />
          <span>30% OFF</span>
        </div>
        <div className="basket-card">
          <div className="basket-grid">
            <span>🍅</span>
            <span>🥦</span>
            <span>🍌</span>
            <span>🥛</span>
            <span>🍞</span>
            <span>🥑</span>
          </div>
          <p className="basket-caption">Handpicked, farm-fresh &amp; on time</p>
        </div>
      </div>
    </section>
  );
}
