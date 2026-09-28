import { useInView } from '../hooks/useInView'
import introImage from '../assets/images/intro/intro-architecture.jpg'

export default function Intro() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        <div>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-earth font-sans mb-6">
            The Studio
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl">
            We create interiors that feel considered, timeless and distinctly
            yours.
          </h2>
          <p className="mt-8 text-charcoal/70 font-sans text-base md:text-lg leading-relaxed max-w-[60ch]">
            Every project is approached through spatial planning, material
            selection, lighting, furniture and craftsmanship — balanced with
            functionality and visual harmony, so the result feels like it
            could only belong to the people living in it.
          </p>
        </div>

        <div className="md:pl-8">
          <img
            src={introImage}
            alt="Minimalist staircase interior with natural light"
            width={1400}
            height={1750}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
