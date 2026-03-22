import { useState } from 'react';
import { getStoredConsentChoice, updateGoogleConsent } from '../../lib/googleConsent';

export default function ConsentBanner() {
  const [hasConsentChoice, setHasConsentChoice] = useState(() => getStoredConsentChoice() !== null);

  const handleConsentChoice = (choice) => {
    updateGoogleConsent(choice);
    setHasConsentChoice(true);
  };

  if (hasConsentChoice) {
    return null;
  }

  return (
    <div
      className="consent-banner"
      role="dialog"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-copy"
      aria-live="polite"
    >
      <div className="consent-banner__card">
        <p className="consent-banner__eyebrow">Privacy Choices</p>
        <h2 id="consent-banner-title">Choose how we use optional cookies</h2>
        <p id="consent-banner-copy">
          We use Google Ads and analytics-style measurement to understand which marketing brings
          in bookings. You can accept or reject optional tracking.
        </p>
        <div className="consent-banner__actions">
          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => handleConsentChoice('denied')}
          >
            Reject Optional
          </button>
          <button className="btn" type="button" onClick={() => handleConsentChoice('granted')}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
