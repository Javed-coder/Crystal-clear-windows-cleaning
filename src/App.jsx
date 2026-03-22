import './App.css';
import Navigation from './components/layout/Navigation';
import ConsentBanner from './components/layout/ConsentBanner';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import ThankYou from './components/sections/ThankYou';
import Footer from './components/layout/Footer';

const THANK_YOU_PATH = '/thank-you';

function normalizePathname(pathname) {
  const trimmedPath = pathname.replace(/\/+$/, '');
  return trimmedPath || '/';
}

export default function App() {
  const currentPath = normalizePathname(window.location.pathname);
  const isThankYouPage = currentPath === THANK_YOU_PATH;

  return (
    <>
      <Navigation isHomePage={!isThankYouPage} />
      <main>
        {isThankYouPage ? (
          <ThankYou />
        ) : (
          <>
            <Hero />
            <About />
            <Services thankYouPath={THANK_YOU_PATH} />
            <Testimonials />
          </>
        )}
      </main>
      <ConsentBanner />
      <Footer isHomePage={!isThankYouPage} />
    </>
  );
}
