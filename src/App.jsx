import './App.css';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
