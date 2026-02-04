export default function Navigation() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">💧 Crystal Clear Windows</div>
        <ul>
          <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
          <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
          <li><a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Reviews</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
