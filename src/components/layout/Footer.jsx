export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Crystal Clear Windows</h3>
            <p>Professional residential and commercial window cleaning with reliable scheduling.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Book Service</a></li>
              <li><a href="#testimonials">Reviews</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:613-600-4850">(613) 600-4850</a></li>
              <li><a href="mailto:crystalclearwindows077@gmail.com">crystalclearwindows077@gmail.com</a></li>
              <li>Mon-Sat: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Crystal Clear Windows. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
