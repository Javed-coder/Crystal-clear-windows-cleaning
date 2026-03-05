import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const onDocClick = (event) => {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, [open]);

  return (
    <nav>
      <div className="container">
        <a href="#home" className="logo" onClick={(event) => handleNavClick(event, '#home')}>
          Crystal Clear Windows
        </a>

        <button
          ref={buttonRef}
          className="nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen((state) => !state)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        <ul id="primary-navigation" ref={menuRef} className={`nav-menu ${open ? 'open' : ''}`}>
          <li><a href="#home" onClick={(event) => handleNavClick(event, '#home')}>Home</a></li>
          <li><a href="#about" onClick={(event) => handleNavClick(event, '#about')}>About</a></li>
          <li><a href="#services" onClick={(event) => handleNavClick(event, '#services')}>Services</a></li>
          <li><a href="#testimonials" onClick={(event) => handleNavClick(event, '#testimonials')}>Reviews</a></li>
          <li><a href="#services" className="nav-cta" onClick={(event) => handleNavClick(event, '#services')}>Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
}
