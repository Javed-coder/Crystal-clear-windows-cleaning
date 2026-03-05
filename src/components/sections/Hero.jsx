export default function Hero() {
  const handleGetQuote = (event) => {
    event.preventDefault();
    const target = document.querySelector('#services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-kicker">Local, Affordable, Clean</p>
        <h1>Window Cleaning That Makes Your Property Stand Out</h1>
        <p>
          Reliable residential and commercial service with affordable pricing, flexible scheduling,
          and quality you can see immediately.
        </p>
        <a href="#services" className="btn" onClick={handleGetQuote}>Schedule a Service</a>
        <div className="hero-highlights">
          <span>100% Satisfaction Focused</span>
          <span>Eco-Friendly Products</span>
        </div>
      </div>
    </section>
  );
}
