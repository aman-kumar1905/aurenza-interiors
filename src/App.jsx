import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'
import DesignPhilosophy from './components/DesignPhilosophy'
import Stats from './components/Stats'
import ProcessStory from './components/ProcessStory'

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
      </main>
    </>
  )
}
