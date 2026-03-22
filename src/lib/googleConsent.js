const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18026174481';
const GOOGLE_ADS_SEND_TO =
  import.meta.env.VITE_GOOGLE_ADS_SEND_TO || `${GOOGLE_ADS_ID}/XXXXXXXXX`;
const GOOGLE_ADS_SCRIPT_SRC = GOOGLE_ADS_ID
  ? `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_ID)}`
  : '';
const CONSENT_STORAGE_KEY = 'ccw-google-consent-v2';

const GRANTED_CONSENT = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
};

const DENIED_CONSENT = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
};

const DEFAULT_CONSENT = {
  ...DENIED_CONSENT,
  wait_for_update: 500,
};

function canUseBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function ensureGtagStub() {
  if (!canUseBrowser()) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  return true;
}

function loadGoogleAdsScript() {
  if (!canUseBrowser() || !GOOGLE_ADS_SCRIPT_SRC) {
    return;
  }

  const existingScript = document.querySelector('script[data-google-ads="true"]');

  if (existingScript) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = GOOGLE_ADS_SCRIPT_SRC;
  script.dataset.googleAds = 'true';
  document.head.appendChild(script);
}

function normalizeConsentChoice(choice) {
  return choice === 'granted' ? 'granted' : 'denied';
}

function getConsentPayload(choice) {
  return normalizeConsentChoice(choice) === 'granted' ? GRANTED_CONSENT : DENIED_CONSENT;
}

export function getStoredConsentChoice() {
  if (!canUseBrowser()) {
    return null;
  }

  try {
    const storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (storedChoice === 'granted' || storedChoice === 'denied') {
      return storedChoice;
    }
  } catch (error) {
    console.warn('Unable to read saved consent choice.', error);
  }

  return null;
}

export function initializeGoogleConsent() {
  if (!GOOGLE_ADS_ID || !ensureGtagStub()) {
    return;
  }

  if (!window.__ccwGoogleConsentInitialized) {
    window.gtag('consent', 'default', DEFAULT_CONSENT);

    const storedChoice = getStoredConsentChoice();
    if (storedChoice) {
      window.gtag('consent', 'update', getConsentPayload(storedChoice));
    }

    loadGoogleAdsScript();
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
    window.__ccwGoogleConsentInitialized = true;
  }
}

export function updateGoogleConsent(choice) {
  if (!ensureGtagStub()) {
    return;
  }

  const normalizedChoice = normalizeConsentChoice(choice);

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, normalizedChoice);
  } catch (error) {
    console.warn('Unable to save consent choice.', error);
  }

  window.gtag('consent', 'update', getConsentPayload(normalizedChoice));
}

export function trackGoogleAdsConversion() {
  if (
    !canUseBrowser() ||
    typeof window.gtag !== 'function' ||
    !GOOGLE_ADS_SEND_TO ||
    GOOGLE_ADS_SEND_TO.includes('XXXXXXXXX') ||
    window.__ccwThankYouConversionTracked
  ) {
    return false;
  }

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_SEND_TO,
  });

  window.__ccwThankYouConversionTracked = true;
  return true;
}
