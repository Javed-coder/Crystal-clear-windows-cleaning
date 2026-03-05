import './App.css'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Services from './components/sections/Services'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Footer />
    </>
  )
}

export default App
