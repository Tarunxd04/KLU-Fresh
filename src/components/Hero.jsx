import React from 'react';
import { Icon } from './Icon';
export function Hero({ onShopNow }) {
  return <section className="fresh-hero" id="home">
    <div className="fresh-hero-copy"><span className="eyebrow"><Icon name="leaf" size={16} /> YOUR EVERYDAY FRESH START</span>
      <h1>Freshness delivered.<br /><span>Goodness, every day.</span></h1>
      <p>Fresh groceries and daily essentials for your home, hostel, and everything in between.</p>
      <button className="btn btn-primary" id="shopNowBtn" onClick={onShopNow}>Shop fresh groceries <span aria-hidden="true">→</span></button>
      <div className="hero-assurance"><span><Icon name="pin" size={16} /> Vijayawada & KLU</span><span><Icon name="leaf" size={16} /> Everyday essentials</span></div>
    </div>
    <div className="fresh-hero-art" role="img" aria-label="Basket of fresh fruit and vegetables" />
  </section>;
}
