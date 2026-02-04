export default function Hero() {
  const handleGetQuote = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Sparkling Clean Windows</h1>
        <p>Professional window cleaning services for your home and business</p>
        <a href="#contact" className="btn" onClick={handleGetQuote}>Get a Free Quote</a>
      </div>
    </section>
  );
}
