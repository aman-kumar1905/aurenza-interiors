import { useInView } from '../hooks/useInView'
import { services } from '../data/services'

function ServiceRow({ service, index }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'is-visible' : ''} border-t border-charcoal/10 py-8 md:py-10 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10`}
    >
      <span className="font-serif text-xl text-champagne/80 md:w-16 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl text-charcoal md:w-72 shrink-0">
        {service.title}
      </h3>
      <p className="text-charcoal/70 font-sans text-base leading-relaxed max-w-[55ch]">
        {service.description}
      </p>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-4">
          Designed From the Inside Out.
        </h2>

        <div className="mt-12">
          {services.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
