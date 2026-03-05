import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_USER = import.meta.env.VITE_EMAILJS_USER || 'eLBVjSrb7R2hEBdvB';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mduwx5q';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_9mfpx8h';
const BUSINESS_EMAIL = 'crystalclearwindows077@gmail.com';

emailjs.init(EMAILJS_USER);

const SERVICE_OPTIONS = [
  {
    icon: 'RES',
    title: 'Residential',
    description: 'Professional window cleaning for homes, including interior and exterior surfaces.',
    price: 49,
    available: true,
  },
  {
    icon: 'COM',
    title: 'Commercial',
    description: 'High-rise and building window cleaning services with safety certifications.',
    price: 149,
    available: false,
  },
  {
    icon: 'NEW',
    title: 'Post-Construction',
    description: 'Specialized cleaning services to remove debris and residue from new construction.',
    price: 199,
    available: false,
  },
  {
    icon: 'PWR',
    title: 'Pressure Washing',
    description: 'Pressure washing services for siding, decks, and other exterior surfaces.',
    price: 89,
    available: false,
  },
  {
    icon: 'FIX',
    title: 'Screen Repair',
    description: 'Window screen repair and replacement services to keep bugs out.',
    price: 39,
    available: false,
  },
  {
    icon: 'PLAN',
    title: 'Maintenance Plans',
    description: 'Recurring service plans to keep your windows pristine year-round.',
    price: 69,
    available: false,
  },
];

const WEEKDAY_TIMES = [
  { label: '08:00 AM', minutes: 8 * 60 },
  { label: '09:00 AM', minutes: 9 * 60 },
  { label: '10:00 AM', minutes: 10 * 60 },
  { label: '11:00 AM', minutes: 11 * 60 },
  { label: '12:00 PM', minutes: 12 * 60 },
  { label: '01:00 PM', minutes: 13 * 60 },
  { label: '02:00 PM', minutes: 14 * 60 },
  { label: '03:00 PM', minutes: 15 * 60 },
  { label: '04:00 PM', minutes: 16 * 60 },
  { label: '05:00 PM', minutes: 17 * 60 },
];

const WEEKEND_TIMES = [
  { label: '09:00 AM', minutes: 9 * 60 },
  { label: '10:00 AM', minutes: 10 * 60 },
  { label: '11:00 AM', minutes: 11 * 60 },
  { label: '12:00 PM', minutes: 12 * 60 },
  { label: '01:00 PM', minutes: 13 * 60 },
  { label: '02:00 PM', minutes: 14 * 60 },
];

function getLocalDateInputValue(date) {
  const tzAdjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return tzAdjusted.toISOString().slice(0, 10);
}

function asLocalDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

export default function Services() {
  const [formValues, setFormValues] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    booking_date: '',
    booking_time: '',
    message: '',
  });
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [sending, setSending] = useState(false);

  const formRef = useRef(null);
  const mediaInputRef = useRef(null);

  const today = useMemo(() => getLocalDateInputValue(new Date()), []);

  const availableTimes = useMemo(() => {
    if (!formValues.booking_date) return [];

    const chosenDate = asLocalDate(formValues.booking_date);
    const isWeekend = chosenDate.getDay() === 0 || chosenDate.getDay() === 6;
    const baseSlots = isWeekend ? WEEKEND_TIMES : WEEKDAY_TIMES;

    if (formValues.booking_date !== today) {
      return baseSlots;
    }

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return baseSlots.filter((slot) => slot.minutes > nowMinutes + 59);
  }, [formValues.booking_date, today]);

  useEffect(() => {
    if (!formValues.booking_time) return;
    if (!availableTimes.some((slot) => slot.label === formValues.booking_time)) {
      setFormValues((prev) => ({ ...prev, booking_time: '' }));
    }
  }, [availableTimes, formValues.booking_time]);

  const selectedService =
    selectedServiceIndex !== null ? SERVICE_OPTIONS[selectedServiceIndex] : null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedService || !selectedService.available) {
      alert('Please select an available service before submitting.');
      return;
    }

    if (!formValues.booking_date || !formValues.booking_time) {
      alert('Please choose your booking date and available time.');
      return;
    }

    setSending(true);

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current);

      setFormValues({
        from_name: '',
        from_email: '',
        phone: '',
        booking_date: '',
        booking_time: '',
        message: '',
      });
      setSelectedServiceIndex(null);
      setSelectedImageCount(0);
      if (mediaInputRef.current) {
        mediaInputRef.current.value = '';
      }
      alert('Thank you. Your booking request has been sent.');
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Unable to send right now. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Confirm Service Booking</h2>
        <p className="section-subtitle">
          Select your service, choose an available time, and submit your request in one step.
        </p>

        <div className="booking-layout">
          <div>
            <h3 className="booking-layout__title">Select a Service</h3>
            <div className="service-grid">
              {SERVICE_OPTIONS.map((service, index) => {
                const isSelected = selectedServiceIndex === index;
                const enabled = service.available;

                return (
                  <article
                    key={service.title}
                    className={[
                      'service-card',
                      enabled ? 'service-card--enabled' : 'service-card--disabled',
                      isSelected ? 'service-card--selected' : '',
                    ].join(' ')}
                    onClick={() => {
                      if (enabled) setSelectedServiceIndex(index);
                    }}
                    onKeyDown={(event) => {
                      if (!enabled) return;
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedServiceIndex(index);
                      }
                    }}
                    role={enabled ? 'button' : undefined}
                    tabIndex={enabled ? 0 : -1}
                    aria-disabled={!enabled}
                  >
                    <span className="service-tag">{service.icon}</span>
                    {enabled ? (
                      <span className="service-price">${service.price}</span>
                    ) : (
                      <span className="service-status">Currently Unavailable</span>
                    )}
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <form ref={formRef} className="booking-form" onSubmit={handleSubmit}>
            <input type="hidden" name="to_email" value={BUSINESS_EMAIL} />
            <input
              type="hidden"
              name="selected_service_name"
              value={selectedService ? selectedService.title : ''}
            />
            <input
              type="hidden"
              name="selected_service_price"
              value={selectedService ? String(selectedService.price) : ''}
            />

            {selectedService ? (
              <p className="booking-summary">
                Selected Service: <strong>{selectedService.title}</strong> (${selectedService.price})
              </p>
            ) : null}

            <label htmlFor="from_name">Full Name</label>
            <input
              id="from_name"
              type="text"
              name="from_name"
              value={formValues.from_name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />

            <label htmlFor="from_email">Email Address</label>
            <input
              id="from_email"
              type="email"
              name="from_email"
              value={formValues.from_email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              pattern="[0-9+()\\-\\s]{7,20}"
              required
            />

            <label htmlFor="booking_date">Booking Date</label>
            <input
              id="booking_date"
              type="date"
              name="booking_date"
              min={today}
              value={formValues.booking_date}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="booking_time">Available Time</label>
            <select
              id="booking_time"
              name="booking_time"
              value={formValues.booking_time}
              onChange={handleInputChange}
              disabled={!formValues.booking_date || availableTimes.length === 0}
              required
            >
              <option value="">
                {!formValues.booking_date
                  ? 'Select a date first'
                  : availableTimes.length === 0
                    ? 'No slots available today'
                    : 'Select available time'}
              </option>
              {availableTimes.map((slot) => (
                <option key={slot.label} value={slot.label}>
                  {slot.label}
                </option>
              ))}
            </select>

            <label htmlFor="message">Project Details (optional)</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              placeholder="Tell us about your property and any access details."
            />

            <label htmlFor="media">Attach House Images (optional)</label>
            <input
              ref={mediaInputRef}
              id="media"
              type="file"
              name="media"
              accept="image/*"
              multiple
              onChange={(event) => setSelectedImageCount((event.target.files || []).length)}
            />
            <p className="file-count">
              {selectedImageCount > 0
                ? `${selectedImageCount} image(s) selected`
                : 'No images selected yet'}
            </p>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
