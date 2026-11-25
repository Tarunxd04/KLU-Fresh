import React from 'react';

export function Hero({ onShopNow }) {
  return (
    <section className="market-hero" id="home" aria-label="Freshness delivered to your doorstep">
      <img className="market-hero-banner" src="/Images/banners/freshness-banner.png"
        width="2172" height="724" fetchPriority="high"
        alt="Freshness Delivered to Your Doorstep. Farm-fresh fruits, vegetables, and daily essentials at prices you'll love. A basket filled with fresh groceries." />
      <button type="button" className="market-shop-button" id="shopNowBtn" onClick={onShopNow}>
        Shop Now <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
