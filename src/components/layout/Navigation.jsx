import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/images/Logo_edited.png';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Navigation({ isHomePage = true }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const resolveHref = (href) => (isHomePage ? href : `/${href}`);

  const goToSection = (event, href) => {
    if (!isHomePage) {
      setOpen(false);
      return;
    }

    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const closeOnOutside = (event) => {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('click', closeOnOutside);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('click', closeOnOutside);
    };
  }, [open]);

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a
          className="nav__brand"
          href={isHomePage ? '#home' : '/'}
          onClick={(event) => goToSection(event, '#home')}
        >
          <img src={logo} alt="Crystal Clear Windows logo" className="nav__logo" />
        </a>

        <button
          ref={toggleRef}
          className="nav__toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen((state) => !state)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        <ul
          id="primary-navigation"
          className={`nav__menu ${open ? 'nav__menu--open' : ''}`}
          ref={menuRef}
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={resolveHref(link.href)} onClick={(event) => goToSection(event, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="nav__cta"
              href={resolveHref('#services')}
              onClick={(event) => goToSection(event, '#services')}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
