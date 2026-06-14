import logo from '../../assets/images/Logo.jpeg';

const TRUST_STATS = [
  { value: '100+', label: 'Happy Customers' },
  { value: 'Ottawa', label: 'Local Service' },
  { value: '5.0★', label: 'Average Rating' },
];

export default function Hero() {
  const goToBooking = (event) => {
    event.preventDefault();
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__media" aria-hidden="true">
        <img src={logo} alt="" className="hero__bg-logo" />
      </div>

      <div className="container hero__content">
        <p className="hero__kicker">Ottawa's Trusted Window Cleaners</p>
        <h1>Window Cleaning That Makes Your Property Stand Out</h1>
        <p>
          Reliable service, clear booking, and spotless results for homes and businesses across Ottawa.
        </p>
        <div className="hero__cta-group">
          <a className="btn" href="#services" onClick={goToBooking}>
            Get a Free Estimate
          </a>
          <a className="btn btn--outline-white" href="tel:613-600-4850">
            Call (613) 600-4850
          </a>
        </div>
        <div className="hero__chips">
          <span>100% Satisfaction Focused</span>
          <span>Eco-Friendly Products</span>
          <span>No Hidden Fees</span>
        </div>
        <div className="hero__trust">
          {TRUST_STATS.map((stat) => (
            <div className="hero__trust-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
