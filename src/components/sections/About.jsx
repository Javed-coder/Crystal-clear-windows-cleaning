import TeamImage from '../../assets/images/whatsapp-image-1.jpeg';

const FEATURES = [
  'Licensed and insured technicians',
  'Detail-oriented interior and exterior cleaning',
  'On-time appointments with clear communication',
  'Safe products for families, pets, and landscaping'
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Why Homeowners and Businesses Choose Us</h2>
        <div className="about-grid">
          <div className="about-text">
            <h3>Your Trusted Window Cleaning Partner</h3>
            <p>
              Crystal Clear Windows delivers dependable service, polished results,
              and respectful customer care on every visit.
            </p>
            <div className="about-features">
              {FEATURES.map((feature) => (
                <div className="feature" key={feature}>
                  <span className="feature-icon" aria-hidden="true">OK</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-media">
            <img src={TeamImage} alt="Crystal Clear Windows service team" />
            <p>Professional results with a friendly local team.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
