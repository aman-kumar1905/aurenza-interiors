import { useInView } from '../hooks/useInView'
import { conceptToSpaceSteps } from '../data/process'
import mainImage from '../assets/images/process-story/process-main.jpg'
import detail1 from '../assets/images/process-story/process-detail-1.jpg'
import detail2 from '../assets/images/process-story/process-detail-2.jpg'

export default function ProcessStory() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto reveal ${isInView ? 'is-visible' : ''}`}
      >
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-16">
          From Concept to Space
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden">
            <img
              src={mainImage}
              alt="Interior design mood board with material samples"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-6 md:gap-8">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={detail1}
                alt="Architectural measured drawing with drafting tools"
                width={800}
                height={450}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={detail2}
                alt="Fabric and material samples pinned to a mood board"
                width={800}
                height={450}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {conceptToSpaceSteps.map((step) => (
            <li key={step.id}>
              <span className="font-serif text-2xl text-champagne/80">{step.number}</span>
              <p className="mt-2 font-sans text-sm md:text-base text-charcoal">{step.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
