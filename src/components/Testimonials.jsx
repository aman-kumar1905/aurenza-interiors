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
        <p className="font-serif text-2xl md:text-4xl leading-[1.4] italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="mt-8 font-sans text-sm tracking-wide uppercase text-ivory/60">
          {testimonial.name} &mdash; {testimonial.projectType}
        </p>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 transition-colors duration-300 ${
                  i === index ? 'bg-champagne' : 'bg-ivory/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
