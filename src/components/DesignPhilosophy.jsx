import { useInView } from '../hooks/useInView'
import philosophyImage from '../assets/images/philosophy/philosophy-main.jpg'

const principles = [
  'Natural materials',
  'Timeless forms',
  'Natural light',
  'Functional planning',
  'Human-scale design',
  'Carefully selected details',
]

export default function DesignPhilosophy() {
  const [ref, isInView] = useInView()

  return (
    <section className="relative bg-charcoal text-ivory py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        <div className="order-2 md:order-1">
          <img
            src={philosophyImage}
            alt="Natural wood and stone materials in a minimalist interior"
            width={1400}
            height={1750}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1]">
            Less Noise.
            <br />
            More Meaning.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 font-sans text-sm md:text-base text-ivory/70">
            {principles.map((principle) => (
              <li key={principle} className="border-t border-ivory/20 pt-3">
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
