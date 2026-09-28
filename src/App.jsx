import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'
import DesignPhilosophy from './components/DesignPhilosophy'
import Stats from './components/Stats'
import ProcessStory from './components/ProcessStory'
import Materials from './components/Materials'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <FeaturedProjects />
        <Services />
        <DesignPhilosophy />
        <Stats />
        <ProcessStory />
        <Materials />
        <Process />
        <Testimonials />
        <About />
      </main>
      <CTA />
      <Footer />
    </>
  )
}
