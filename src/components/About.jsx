import { useInView } from '../hooks/useInView'
import aboutImage from '../assets/images/about/about-main.jpg'

export default function About() {
  const [ref, isInView] = useInView()

  return (
    <section id="about" className="bg-sand py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        <div>
          <img
            src={aboutImage}
            alt="AURENZA INTERIORS design studio workspace"
            width={2000}
            height={2667}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-earth font-sans mb-6">
            About the Studio
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal mb-8">
            Designing Spaces With Intention.
          </h2>
          <p className="text-charcoal/70 font-sans text-base md:text-lg leading-relaxed max-w-[55ch]">
            AURENZA INTERIORS approaches every space through design thinking,
            personalisation, craftsmanship and materiality — always weighed
            against how a space actually functions day to day, and built to
            stay visually relevant well beyond the day it's finished.
          </p>
        </div>
      </div>
    </section>
  )
}
