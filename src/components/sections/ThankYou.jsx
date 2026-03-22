import { useEffect } from 'react';
import logo from '../../assets/images/Logo.jpeg';
import { trackGoogleAdsConversion } from '../../lib/googleConsent';

export default function ThankYou() {
  useEffect(() => {
    trackGoogleAdsConversion();
  }, []);

  return (
    <section className="thank-you-page" id="thank-you">
      <div className="thank-you-page__media" aria-hidden="true">
        <img src={logo} alt="" className="thank-you-page__bg-logo" />
      </div>

      <div className="container thank-you-page__content">
        <div className="thank-you-card">
          <p className="hero__kicker">Request Received</p>
          <h1>Thank You for Booking with Crystal Clear Windows</h1>
          <p>
            Your request was submitted successfully. We&apos;ll review the details and contact
            you soon to confirm your service.
          </p>
          <a className="btn" href="/">
            Back to Home
          </a>
          <p className="thank-you-card__note">
            Need immediate help? Call us at <a href="tel:613-600-4850">(613) 600-4850</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
