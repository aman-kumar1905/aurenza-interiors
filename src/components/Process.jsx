import { useInView } from '../hooks/useInView'
import { processSteps } from '../data/process'

function StepCard({ step }) {
  const [ref, isInView] = useInView()

  return (
    <div ref={ref} className={`reveal ${isInView ? 'is-visible' : ''} border-t border-charcoal/10 pt-6`}>
      <span className="font-serif text-3xl text-champagne/80">{step.number}</span>
      <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-3 mb-2">{step.title}</h3>
      <p className="text-charcoal/70 font-sans text-sm md:text-base leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-16">
          A Thoughtful Process.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {processSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
