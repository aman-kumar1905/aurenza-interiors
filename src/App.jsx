import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <FeaturedProjects />
        <Services />
      </main>
    </>
  )
}
