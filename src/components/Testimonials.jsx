import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [ref, isInView] = useInView()
  const [index, setIndex] = useState(0)
  const testimonial = testimonials[index]

  return (
    <section className="bg-charcoal text-ivory py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center reveal ${isInView ? 'is-visible' : ''}`}
      >
        <h2 className="sr-only">Client Testimonials</h2>
        <p className="font-serif text-2xl md:text-4xl leading-[1.4] italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="mt-8 font-sans text-sm tracking-wide uppercase text-ivory/60">
          {testimonial.name} &mdash; {testimonial.projectType}
        </p>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-1 mt-10">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className="p-3"
              >
                <span
                  className={`block h-1.5 w-6 transition-colors duration-300 ${
                    i === index ? 'bg-champagne' : 'bg-ivory/30'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
