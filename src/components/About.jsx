import ReactLogo from '../assets/react.svg';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="about-grid">
          <div className="about-text">
            <h2>Your Trusted Window Cleaning Partner</h2>
            <p>With over 10 years of experience in the window cleaning industry, we pride ourselves on delivering exceptional results with a commitment to customer satisfaction.</p>
            
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Licensed and Insured</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Fast and Reliable Service</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Competitive Pricing</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Eco-Friendly Products</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={ReactLogo} alt="Window Cleaning" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <p style={{ color: '#999', fontSize: '1.2rem', marginTop: '1rem' }}>Crystal clear results, guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
