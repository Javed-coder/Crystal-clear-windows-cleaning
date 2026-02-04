export default function Services() {
  const services = [
    {
      icon: '🏠',
      title: 'Residential',
      description: 'Professional window cleaning for homes, including interior and exterior surfaces.'
    },
    {
      icon: '🏢',
      title: 'Commercial',
      description: 'High-rise and building window cleaning services with safety certifications.'
    },
    {
      icon: '🧹',
      title: 'Post-Construction',
      description: 'Specialized cleaning services to remove debris and residue from new construction.'
    },
    {
      icon: '💨',
      title: 'Pressure Washing',
      description: 'Pressure washing services for siding, decks, and other exterior surfaces.'
    },
    {
      icon: '🪟',
      title: 'Screen Repair',
      description: 'Window screen repair and replacement services to keep bugs out.'
    },
    {
      icon: '🔧',
      title: 'Maintenance Plans',
      description: 'Recurring service plans to keep your windows pristine year-round.'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
