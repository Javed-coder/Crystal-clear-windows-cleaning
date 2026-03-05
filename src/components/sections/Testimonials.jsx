const TESTIMONIALS = [
  {
    rating: '5.0/5',
    quote:
      'The team was prompt, professional, and our storefront windows looked perfect before opening.',
    author: 'Sarah J.',
    role: 'Retail Owner',
  },
  {
    rating: '5.0/5',
    quote:
      'Very organized booking process and excellent attention to detail inside and outside our home.',
    author: 'Michael C.',
    role: 'Homeowner',
  },
  {
    rating: '5.0/5',
    quote:
      'Fair pricing, great communication, and consistent quality. We now schedule recurring service.',
    author: 'Jennifer D.',
    role: 'Property Manager',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title section-title--light">Client Reviews</h2>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((item) => (
            <article className="testimonial-card" key={item.author}>
              <p className="testimonial-card__rating">{item.rating}</p>
              <p className="testimonial-card__quote">"{item.quote}"</p>
              <p className="testimonial-card__author">{item.author}</p>
              <p className="testimonial-card__role">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
