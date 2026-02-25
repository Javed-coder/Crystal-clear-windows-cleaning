import { useState, useEffect } from 'react';
import Contact from './Contact';

export default function Services() {
  const services = [
    {
      icon: '🏠',
      title: 'Residential',
      description: 'Professional window cleaning for homes, including interior and exterior surfaces.',
      price: 49
    },
    {
      icon: '🏢',
      title: 'Commercial',
      description: 'High-rise and building window cleaning services with safety certifications.',
      price: 149
    },
    {
      icon: '🧹',
      title: 'Post-Construction',
      description: 'Specialized cleaning services to remove debris and residue from new construction.',
      price: 199
    },
    {
      icon: '💨',
      title: 'Pressure Washing',
      description: 'Pressure washing services for siding, decks, and other exterior surfaces.',
      price: 89
    },
    {
      icon: '🪟',
      title: 'Screen Repair',
      description: 'Window screen repair and replacement services to keep bugs out.',
      price: 39
    },
    {
      icon: '🔧',
      title: 'Maintenance Plans',
      description: 'Recurring service plans to keep your windows pristine year-round.',
      price: 69
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedService');
      if (saved) {
        const parsed = JSON.parse(saved);
        const idx = services.findIndex(s => s.title === parsed.title);
        if (idx >= 0) setSelectedIndex(idx);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const chooseService = (service, index) => {
    setSelectedIndex(index);
    try {
      localStorage.setItem('selectedService', JSON.stringify(service));
    } catch (e) {
      // ignore storage errors
    }
  };
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Please Select a Service</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className={`service-card ${selectedIndex === index ? 'selected' : ''}`}
              key={index}
              onClick={() => chooseService(service, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') chooseService(service, index); }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="price-overlay">${service.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
