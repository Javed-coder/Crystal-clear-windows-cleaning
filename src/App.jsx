import './App.css'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Contact />
      <Testimonials />
      <Footer />
    </>
  )
}

export default App
