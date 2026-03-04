import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS config: prefer Vite env vars. Create a `.env` with these keys:
// VITE_EMAILJS_USER, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_USER = import.meta.env.VITE_EMAILJS_USER || 'eLBVjSrb7R2hEBdvB';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mduwx5q';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_9mfpx8h';

emailjs.init(EMAILJS_USER);

const BUSINESS_EMAIL = 'romal.alimzai07@gmail.com';

const WEEKDAY_TIME_SLOTS = [
  { label: '08:00 AM', minutes: 8 * 60 },
  { label: '09:00 AM', minutes: 9 * 60 },
  { label: '10:00 AM', minutes: 10 * 60 },
  { label: '11:00 AM', minutes: 11 * 60 },
  { label: '12:00 PM', minutes: 12 * 60 },
  { label: '01:00 PM', minutes: 13 * 60 },
  { label: '02:00 PM', minutes: 14 * 60 },
  { label: '03:00 PM', minutes: 15 * 60 },
  { label: '04:00 PM', minutes: 16 * 60 },
  { label: '05:00 PM', minutes: 17 * 60 }
];

const WEEKEND_TIME_SLOTS = [
  { label: '09:00 AM', minutes: 9 * 60 },
  { label: '10:00 AM', minutes: 10 * 60 },
  { label: '11:00 AM', minutes: 11 * 60 },
  { label: '12:00 PM', minutes: 12 * 60 },
  { label: '01:00 PM', minutes: 13 * 60 },
  { label: '02:00 PM', minutes: 14 * 60 }
];

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

function parseLocalDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

export default function Contact() {
  const services = [
    {
      icon: 'RES',
      title: 'Residential',
      description: 'Professional window cleaning for homes, including interior and exterior surfaces.',
      price: 49,
      isAvailable: true
    },
    {
      icon: 'COM',
      title: 'Commercial',
      description: 'High-rise and building window cleaning services with safety certifications.',
      price: 149,
      isAvailable: false
    },
    {
      icon: 'NEW',
      title: 'Post-Construction',
      description: 'Specialized cleaning services to remove debris and residue from new construction.',
      price: 199,
      isAvailable: false
    },
    {
      icon: 'PWR',
      title: 'Pressure Washing',
      description: 'Pressure washing services for siding, decks, and other exterior surfaces.',
      price: 89,
      isAvailable: false
    },
    {
      icon: 'FIX',
      title: 'Screen Repair',
      description: 'Window screen repair and replacement services to keep bugs out.',
      price: 39,
      isAvailable: false
    },
    {
      icon: 'PLAN',
      title: 'Maintenance Plans',
      description: 'Recurring service plans to keep your windows pristine year-round.',
      price: 69,
      isAvailable: false
    }
  ];

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: '',
    booking_date: '',
    booking_time: ''
  });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const mediaRef = useRef(null);
  const todayString = toDateString(new Date());

  const availableTimeSlots = useMemo(() => {
    if (!formData.booking_date) return [];

    const selected = parseLocalDate(formData.booking_date);
    const day = selected.getDay();
    const isWeekend = day === 0 || day === 6;
    const baseSlots = isWeekend ? WEEKEND_TIME_SLOTS : WEEKDAY_TIME_SLOTS;

    if (formData.booking_date !== todayString) {
      return baseSlots;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return baseSlots.filter((slot) => slot.minutes > currentMinutes + 59);
  }, [formData.booking_date, todayString]);

  useEffect(() => {
    if (!formData.booking_time) return;
    const stillAvailable = availableTimeSlots.some((slot) => slot.label === formData.booking_time);
    if (!stillAvailable) {
      setFormData((prev) => ({ ...prev, booking_time: '' }));
    }
  }, [availableTimeSlots, formData.booking_time]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIndex === null || !services[selectedIndex]?.isAvailable) {
      alert('Please select a service before confirming your booking.');
      return;
    }
    if (!formData.booking_date || !formData.booking_time) {
      alert('Please select your booking date and available time.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      );

      alert('Thank you for your message! We will contact you soon.');
      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        message: '',
        booking_date: '',
        booking_time: ''
      });
      setSelectedIndex(null);
      setSelectedFiles([]);
      if (mediaRef.current) {
        mediaRef.current.value = '';
      }
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
        <h2 className="section-title">Confirm Service Booking</h2>
        <p className="section-subtitle">Select your service, choose an available time, and submit your request in one step.</p>
        <div className="booking-layout">
          <div className="booking-services">
            <h3>Select a Service</h3>
            <div className="services-grid">
              {services.map((service, index) => (
                <div
                  className={`service-card ${service.isAvailable ? 'available' : 'unavailable'} ${selectedIndex === index ? 'selected' : ''}`}
                  key={service.title}
                  onClick={() => {
                    if (service.isAvailable) {
                      setSelectedIndex(index);
                    }
                  }}
                  role={service.isAvailable ? 'button' : undefined}
                  tabIndex={service.isAvailable ? 0 : -1}
                  aria-disabled={!service.isAvailable}
                  onKeyDown={(event) => {
                    if (service.isAvailable && (event.key === 'Enter' || event.key === ' ')) {
                      setSelectedIndex(index);
                    }
                  }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {service.isAvailable ? (
                    <div className="price-overlay">${service.price}</div>
                  ) : (
                    <div className="availability-overlay">Currently Unavailable</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="to_email" value={BUSINESS_EMAIL} />
            <input type="hidden" name="selected_service_name" value={selectedIndex !== null ? services[selectedIndex].title : ''} />
            <input type="hidden" name="selected_service_price" value={selectedIndex !== null ? String(services[selectedIndex].price) : ''} />
            {selectedIndex !== null && (
              <div className="booking-summary">
                Selected Service: <strong>{services[selectedIndex].title}</strong> (${services[selectedIndex].price})
              </div>
            )}

            <label htmlFor="from_name">Full Name</label>
            <input 
              id="from_name"
              type="text" 
              name="from_name"
              placeholder="Enter your full name"
              value={formData.from_name}
              onChange={handleChange}
              required 
            />
            <label htmlFor="from_email">Email Address</label>
            <input 
              id="from_email"
              type="email" 
              name="from_email"
              placeholder="Enter your email"
              value={formData.from_email}
              onChange={handleChange}
              required 
            />
            <label htmlFor="phone">Phone Number</label>
            <input 
              id="phone"
              type="tel" 
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9+()\\-\\s]{7,20}"
              required 
            />
            <label htmlFor="booking_date">Booking Date</label>
            <input
              id="booking_date"
              type="date"
              name="booking_date"
              min={todayString}
              value={formData.booking_date}
              onChange={handleChange}
              required
            />
            <label htmlFor="booking_time">Available Time</label>
            <select
              id="booking_time"
              name="booking_time"
              value={formData.booking_time}
              onChange={handleChange}
              disabled={!formData.booking_date || availableTimeSlots.length === 0}
              required
            >
              <option value="">
                {!formData.booking_date
                  ? 'Select a date first'
                  : availableTimeSlots.length === 0
                    ? 'No slots available today'
                    : 'Select available time'}
              </option>
              {availableTimeSlots.map((slot) => (
                <option key={slot.label} value={slot.label}>
                  {slot.label}
                </option>
              ))}
            </select>
            <label htmlFor="message">Project Details (optional)</label>
            <textarea 
              id="message"
              name="message"
              placeholder="Tell us about your property, windows, and any special access details."
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="media">Attach House Images (optional)</label>
            <input
              ref={mediaRef}
              id="media"
              type="file"
              name="media"
              accept="image/*"
              multiple
              onChange={(event) => setSelectedFiles(Array.from(event.target.files || []))}
            />
            <p className="file-hint">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} image(s) selected`
                : 'No images selected yet'}
            </p>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
