import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_USER = import.meta.env.VITE_EMAILJS_USER || 'eLBVjSrb7R2hEBdvB';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mduwx5q';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_9mfpx8h';
const BUSINESS_EMAIL = 'crystalclearwindows077@gmail.com';

emailjs.init(EMAILJS_USER);

const SERVICE_OPTIONS = [
  {
    icon: 'FREE',
    title: 'Residential',
    description: 'Professional window cleaning for homes, including interior and exterior surfaces.',
    price: null,
    available: true,
  },
  {
    icon: 'COM',
    title: 'Commercial',
    description: 'High-rise and building window cleaning services with safety certifications.',
    price: null,
    available: false,
  },
  {
    icon: 'CON',
    title: 'Post-Construction',
    description: 'Specialized cleaning services to remove debris and residue from new construction.',
    price: null,
    available: false,
  },
  {
    icon: 'PWR',
    title: 'Pressure Washing',
    description: 'Pressure washing services for siding, decks, and other exterior surfaces.',
    price: null,
    available: false,
  },
  {
    icon: 'SCR',
    title: 'Screen Repair',
    description: 'Window screen repair and replacement services to keep bugs out.',
    price: null,
    available: false,
  },
  {
    icon: 'SUB',
    title: 'Maintenance Plans',
    description: 'Recurring service plans to keep your windows pristine year-round.',
    price: null,
    available: false,
  },
];

const hasPrice = (service) => typeof service.price === 'number';

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

export default function Services({ thankYouPath = '/thank-you' }) {
  const [formValues, setFormValues] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    address_city: 'Ottawa',
    address_postal: '',
    booking_date: '',
    booking_time: '',
    message: '',
  });
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');

  // Address autocomplete (OpenStreetMap / Photon — free, no API key)
  const [addressQuery, setAddressQuery] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const justSelectedRef = useRef(false);

  const formRef = useRef(null);
  const mediaInputRef = useRef(null);

  const today = useMemo(() => getLocalDateInputValue(new Date()), []);

  const availableTimes = useMemo(() => {
    if (!formValues.booking_date) return [];

    const chosenDate = asLocalDate(formValues.booking_date);
    const isWeekend = chosenDate.getDay() === 0 || chosenDate.getDay() === 6;
    const baseSlots = isWeekend ? WEEKEND_TIMES : WEEKDAY_TIMES;

    if (formValues.booking_date !== today) return baseSlots;

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

  // Debounced address lookup against Photon (biased toward Ottawa)
  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    const query = addressQuery.trim();
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const url =
          'https://photon.komoot.io/api/?q=' +
          encodeURIComponent(query) +
          '&limit=5&lang=en&lat=45.4215&lon=-75.6972';
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setAddressSuggestions(Array.isArray(data.features) ? data.features : []);
        setShowSuggestions(true);
      } catch {
        // network/abort — ignore, user can still type manually
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [addressQuery]);

  const handleAddressSelect = (feature) => {
    const p = feature.properties || {};
    const line1 = [p.housenumber, p.street || p.name].filter(Boolean).join(' ');
    const line2 = [p.suburb, p.district].filter(Boolean).join(', ');
    justSelectedRef.current = true;
    setFormValues((prev) => ({
      ...prev,
      address_line1: line1 || p.name || '',
      address_line2: line2,
      address_city: p.city || p.town || p.village || prev.address_city,
      address_postal: p.postcode || '',
    }));
    setAddressQuery(line1 || p.name || '');
    setAddressSuggestions([]);
    setShowSuggestions(false);
  };

  const selectedService =
    selectedServiceIndex !== null ? SERVICE_OPTIONS[selectedServiceIndex] : null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceClick = (index) => {
    const service = SERVICE_OPTIONS[index];
    if (!service.available) return;
    setSelectedServiceIndex(index);
    setFormError('');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedService || !selectedService.available) {
      setFormError('Please select an available service before submitting.');
      return;
    }

    if (!formValues.address_line1.trim() || !formValues.address_city.trim()) {
      setFormError('Please enter the service address (street and city).');
      return;
    }

    if (!formValues.booking_date || !formValues.booking_time) {
      setFormError('Please choose your booking date and available time.');
      return;
    }

    if (!formRef.current) {
      setFormError('The booking form is unavailable right now. Please refresh and try again.');
      return;
    }

    setFormError('');
    setSending(true);

    // Combine the structured address fields into one line for the CRM + email
    const fullAddress = [
      formValues.address_line1,
      formValues.address_line2,
      formValues.address_city,
      formValues.address_postal,
    ]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(', ');

    // Fire CRM webhook immediately — independent of EmailJS so it always runs
    const crmUrl = import.meta.env.VITE_CRM_WEBHOOK_URL;
    const crmSecret = import.meta.env.VITE_CRM_WEBHOOK_SECRET;
    if (crmUrl && crmSecret) {
      fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': crmSecret },
        body: JSON.stringify({
          name: formValues.from_name,
          email: formValues.from_email,
          phone: formValues.phone,
          address: fullAddress,
          date: formValues.booking_date,
          time: formValues.booking_time,
          service: selectedService?.title ?? 'Residential',
          notes: formValues.message,
        }),
      }).catch(() => undefined);
    }

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current);

      setFormValues({
        from_name: '',
        from_email: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        address_city: 'Ottawa',
        address_postal: '',
        booking_date: '',
        booking_time: '',
        message: '',
      });
      setAddressQuery('');
      setAddressSuggestions([]);
      setSelectedServiceIndex(null);
      setSelectedImageCount(0);
      if (mediaInputRef.current) mediaInputRef.current.value = '';
      window.location.assign(thankYouPath);
    } catch (error) {
      console.error('Email send failed:', error);
      setFormError('Unable to send right now. Please try again or call us directly.');
    } finally {
      setSending(false);
    }
  };


  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Book Your Service</h2>
        <p className="section-subtitle">
          Select your service, choose an available time, and submit your request in one step.
        </p>

        <div className="call-info-box">
          <p>
            <strong>Prefer talking to us directly?</strong>{' '}
            Call <a href="tel:613-600-4850">(613) 600-4850</a> for instant on-call booking and personalized service recommendations!
          </p>
        </div>

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
                    onClick={() => handleServiceClick(index)}
                    onKeyDown={(event) => {
                      if (!enabled) return;
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleServiceClick(index);
                      }
                    }}
                    role={enabled ? 'button' : undefined}
                    tabIndex={enabled ? 0 : -1}
                    aria-disabled={!enabled}
                  >
                    <span className="service-tag">{service.icon}</span>
                    {enabled && hasPrice(service) ? (
                      <span className="service-price">${service.price}</span>
                    ) : !enabled ? (
                      <span className="service-status">Coming Soon</span>
                    ) : null}
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <form
            ref={formRef}
            className="booking-form"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="to_email" value={BUSINESS_EMAIL} />
            <input
              type="hidden"
              name="selected_service_name"
              value={selectedService ? selectedService.title : ''}
            />
            <input
              type="hidden"
              name="selected_service_price"
              value={selectedService && hasPrice(selectedService) ? String(selectedService.price) : ''}
            />

            {selectedService && (
              <p className="booking-summary">
                Selected: <strong>{selectedService.title}</strong>
                {hasPrice(selectedService) ? ` — $${selectedService.price}` : ' — Free Estimate'}
              </p>
            )}

            {formError && (
              <p className="booking-form__error" role="alert">{formError}</p>
            )}

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="from_name">Full Name</label>
                <input
                  id="from_name"
                  type="text"
                  name="from_name"
                  value={formValues.from_name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="from_email">Email Address</label>
                <input
                  id="from_email"
                  type="email"
                  name="from_email"
                  value={formValues.from_email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  pattern="[0-9+()\\-\\s]{7,20}"
                  required
                />
              </div>
              <div className="form-field">
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
              </div>
            </div>

            <div className="form-field address-autocomplete">
              <label htmlFor="address_search">Search Your Address</label>
              <input
                id="address_search"
                type="text"
                autoComplete="off"
                value={addressQuery}
                onChange={(e) => {
                  setAddressQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Start typing, e.g. 25 Woodridge"
              />
              {showSuggestions && addressSuggestions.length > 0 && (
                <ul className="address-suggestions">
                  {addressSuggestions.map((feature, i) => {
                    const p = feature.properties || {};
                    const label = [
                      [p.housenumber, p.street || p.name].filter(Boolean).join(' '),
                      p.city || p.town || p.village,
                      p.postcode,
                    ]
                      .filter(Boolean)
                      .join(', ');
                    return (
                      <li
                        key={i}
                        onMouseDown={() => handleAddressSelect(feature)}
                      >
                        {label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="address_line1">Address Line 1</label>
                <input
                  id="address_line1"
                  type="text"
                  name="address_line1"
                  value={formValues.address_line1}
                  onChange={handleInputChange}
                  placeholder="Street number and name"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="address_line2">Address Line 2 (optional)</label>
                <input
                  id="address_line2"
                  type="text"
                  name="address_line2"
                  value={formValues.address_line2}
                  onChange={handleInputChange}
                  placeholder="Unit, suite, buzzer"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="address_city">City</label>
                <input
                  id="address_city"
                  type="text"
                  name="address_city"
                  value={formValues.address_city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="address_postal">Postal Code</label>
                <input
                  id="address_postal"
                  type="text"
                  name="address_postal"
                  value={formValues.address_postal}
                  onChange={handleInputChange}
                  placeholder="K1A 0A6"
                />
              </div>
            </div>

            <div className="form-field">
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
            </div>

            <div className="form-field">
              <label htmlFor="message">Project Details (optional)</label>
              <textarea
                id="message"
                name="message"
                value={formValues.message}
                onChange={handleInputChange}
                placeholder="Tell us about your property and any access details."
              />
            </div>

            <div className="form-field">
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
                  ? `${selectedImageCount} image${selectedImageCount > 1 ? 's' : ''} selected`
                  : 'No images selected yet'}
              </p>
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Submitting…' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
