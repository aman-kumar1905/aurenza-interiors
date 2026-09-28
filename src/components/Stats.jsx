import { useInView } from '../hooks/useInView'
import { stats } from '../data/stats'

export default function Stats() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-sand py-16 md:py-20 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.id}>
            <p className="font-serif text-4xl md:text-5xl text-charcoal">{stat.value}</p>
            <p className="mt-2 text-xs md:text-sm tracking-wide uppercase text-earth font-sans">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-charcoal/40 font-sans mt-10">
        Demo figures for presentation purposes — to be replaced with verified data.
      </p>
    </section>
  )
}
