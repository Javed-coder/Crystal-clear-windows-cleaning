export default function Hero() {
  const goToBooking = (event) => {
    event.preventDefault();
    const target = document.querySelector('#services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="container hero__content">
        <p className="hero__kicker">Local. Affordable. Clean.</p>
        <h1>Window Cleaning That Makes Your Property Stand Out</h1>
        <p>
          Reliable service, clear booking, and results you can trust for homes and businesses.
        </p>
        <a className="btn" href="#services" onClick={goToBooking}>
          Schedule a Service
        </a>
        <div className="hero__chips">
          <span>100% Satisfaction Focused</span>
          <span>Eco-Friendly Products</span>
        </div>
      </div>
    </section>
  );
}
