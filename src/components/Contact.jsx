import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS (replace with your actual public key from EmailJS dashboard)
emailjs.init('eLBVjSrb7R2hEBdvB');

const BUSINESS_EMAIL = 'romal.alimzai07@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email to your business email
      await emailjs.send(
        'service_mduwx5q', // Replace with your EmailJS service ID
        'template_9mfpx8h', // Replace with your EmailJS template ID
        {
          to_email: BUSINESS_EMAIL,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      );

      alert('Thank you for your message! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <strong>📞 Phone</strong>
              (555) 123-4567
            </div>
            <div className="contact-item">
              <strong>📧 Email</strong>
              info@crystalclearwindows.com
            </div>
            <div className="contact-item">
              <strong>📍 Address</strong>
              <div>123 Main Street<br />
              Your City, ST 12345</div>
            </div>
            <div className="contact-item">
              <strong>🕐 Hours</strong>
              <div>Monday - Friday: 8:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 4:00 PM<br />
              Sunday: Closed</div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Your Phone" 
              value={formData.phone}
              onChange={handleChange}
              required 
            />
            <textarea 
              name="message"
              placeholder="Tell us about your window cleaning needs..." 
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
