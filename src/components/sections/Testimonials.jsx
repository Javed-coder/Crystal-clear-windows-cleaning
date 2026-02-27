const TESTIMONIALS = [
  {
    rating: '5.0/5',
    text: 'The team was prompt, professional, and our storefront windows looked perfect before opening.',
    author: 'Sarah J.',
    type: 'Retail Owner'
  },
  {
    rating: '5.0/5',
    text: 'Very organized booking process and excellent attention to detail inside and outside our home.',
    author: 'Michael C.',
    type: 'Homeowner'
  },
  {
    rating: '5.0/5',
    text: 'Fair pricing, great communication, and consistent quality. We have now scheduled recurring service.',
    author: 'Jennifer D.',
    type: 'Property Manager'
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Client Reviews</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.author}>
              <div className="stars">{testimonial.rating}</div>
              <p>"{testimonial.text}"</p>
              <div className="testimonial-author">{testimonial.author}</div>
              <div className="testimonial-role">{testimonial.type}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
