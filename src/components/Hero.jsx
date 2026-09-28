import { ChevronDown } from 'lucide-react'
import { useScrollY } from '../hooks/useScrollY'
import heroImage from '../assets/images/hero/hero-main.jpg'

export default function Hero() {
  const scrollY = useScrollY()

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div
        className="parallax-layer absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.15}px) scale(1.1)` }}
      >
        <img
          src={heroImage}
          alt="Contemporary living room with floor-to-ceiling windows and warm natural light"
          width={2000}
          height={1333}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-ivory/80 text-xs md:text-sm tracking-[0.3em] uppercase font-sans mb-6">
          Interior Architecture &bull; Design &bull; Craft
        </p>
        <h1 className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl">
          Spaces Designed
          <br />
          Around the Way
          <br />
          You Live.
        </h1>
        <p className="text-ivory/80 font-sans text-base md:text-lg mt-6 max-w-xl">
          Thoughtful interiors shaped by architecture, material, light and the
          people who inhabit them.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="#projects"
            className="bg-ivory text-charcoal px-7 py-3 text-sm tracking-wide hover:bg-champagne transition-colors duration-300"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="border border-ivory text-ivory px-7 py-3 text-sm tracking-wide hover:bg-ivory hover:text-charcoal transition-colors duration-300"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      <ChevronDown
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/80 animate-bounce"
        size={28}
        aria-hidden="true"
      />
    </section>
  )
}
