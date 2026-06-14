import cleanerImage from '../../assets/images/about-cleaner-blue.jpg';

const FEATURES = [
  'Licensed and insured technicians',
  'Detail-oriented interior and exterior cleaning',
  'On-time appointments with clear communication',
  'Safe products for families, pets, and landscaping',
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <polyline points="4 10 8 14 16 6" />
    </svg>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Why Homeowners and Businesses Choose Us</h2>

        <div className="about__grid">
          <div className="about__copy">
            <h3>Your Trusted Window Cleaning Partner</h3>
            <p>
              Crystal Clear Windows delivers dependable service, polished results, and respectful
              customer care on every visit.
            </p>
            <div className="about__features">
              {FEATURES.map((item) => (
                <div className="about__feature" key={item}>
                  <span className="about__feature-tag" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about__media">
            <img src={cleanerImage} alt="Professional window cleaners in blue uniforms" />
            <p className="about__slogan">Local. Affordable. Clean.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
