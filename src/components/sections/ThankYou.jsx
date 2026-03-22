import { useEffect } from 'react';
import logo from '../../assets/images/Logo.jpeg';

const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18026174481';
const GOOGLE_ADS_SEND_TO =
  import.meta.env.VITE_GOOGLE_ADS_SEND_TO || `${GOOGLE_ADS_ID}/XXXXXXXXX`;
const GOOGLE_ADS_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_ID)}`;

function ensureGoogleAdsIsReady() {
  if (typeof window === 'undefined' || !GOOGLE_ADS_ID) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  if (!window.__ccwGoogleAdsConfigured) {
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
    window.__ccwGoogleAdsConfigured = true;
  }

  const existingScript = document.querySelector('script[data-google-ads="true"]');

  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = GOOGLE_ADS_SCRIPT_SRC;
    script.dataset.googleAds = 'true';
    document.head.appendChild(script);
  }

  return true;
}

export default function ThankYou() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !ensureGoogleAdsIsReady() ||
      window.__ccwThankYouConversionTracked ||
      !GOOGLE_ADS_SEND_TO ||
      GOOGLE_ADS_SEND_TO.includes('XXXXXXXXX')
    ) {
      return;
    }

    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_SEND_TO,
    });

    window.__ccwThankYouConversionTracked = true;
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
