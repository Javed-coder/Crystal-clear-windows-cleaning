export default function Footer({ isHomePage = true }) {
  const year = new Date().getFullYear();
  const resolveHref = (href) => (isHomePage ? href : `/${href}`);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h3>Crystal Clear Windows</h3>
            <p>
              Professional residential and commercial window cleaning with reliable scheduling.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href={resolveHref('#home')}>Home</a></li>
              <li><a href={resolveHref('#about')}>About</a></li>
              <li><a href={resolveHref('#services')}>Book Service</a></li>
              <li><a href={resolveHref('#testimonials')}>Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><strong><a href="tel:613-600-4850">(613) 600-4850</a></strong></li>
              <li style={{ fontSize: '14px', fontStyle: 'italic' }}>Call for instant on-call booking</li>
              <li><a href="mailto:crystalclearwindows077@gmail.com">crystalclearwindows077@gmail.com</a></li>
              <li>Mon-Sat: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} Crystal Clear Windows. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
