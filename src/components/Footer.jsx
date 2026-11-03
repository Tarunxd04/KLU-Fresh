import React from 'react';
import { CATEGORIES } from '../utils/constants';

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid scroll-reveal">
        <div className="footer-col">
          <div className="logo">
            <span className="logo-leaf">🌿</span>
            <span className="logo-text">
              KLU <span>Fresh</span>
            </span>
          </div>
          <p>Fresh groceries delivered to your doorstep across Vijayawada &amp; KL University.</p>
        </div>
        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            {CATEGORIES.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Customer Support</h4>
          <ul>
            <li>Help &amp; FAQs</li>
            <li>Contact: support@klufresh.com</li>
            <li>Helpline: +91 866 245 6789</li>
            <li>Returns Policy</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 KLU Fresh | Customer &amp; Admin Storefront Platform
      </div>
    </footer>
  );
}
