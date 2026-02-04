export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      text: '"Crystal Clear Windows did an amazing job! My windows have never looked better. Highly recommended!"',
      author: '- Sarah Johnson'
    },
    {
      stars: '★★★★★',
      text: '"Professional, punctual, and thorough. They went above and beyond my expectations. Great service!"',
      author: '- Mike Chen'
    },
    {
      stars: '★★★★★',
      text: '"Best window cleaning service in the area. Fair pricing and excellent results. Will definitely use again!"',
      author: '- Jennifer Davis'
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="stars">{testimonial.stars}</div>
              <p>{testimonial.text}</p>
              <div className="testimonial-author">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
