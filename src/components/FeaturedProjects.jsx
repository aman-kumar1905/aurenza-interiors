import { ArrowUpRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'

function ProjectCard({ project }) {
  const [ref, isInView] = useInView()
  const spanClass =
    project.layout === 'wide'
      ? 'md:col-span-2'
      : project.layout === 'tall'
      ? 'md:row-span-2'
      : ''
  const aspectClass = project.layout === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden reveal ${spanClass} ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <div className={`${aspectClass} overflow-hidden`}>
        <img
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          width={1600}
          height={1000}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-ivory">
        <p className="text-xs tracking-[0.25em] uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">
          {project.category}
        </p>
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-2xl md:text-3xl transition-transform duration-300 group-hover:-translate-y-1">
            {project.title}
          </h3>
          <ArrowUpRight
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            size={22}
          />
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-sand py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-earth font-sans mb-6">
            Selected Spaces
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal">
            A glimpse into our approach to contemporary interiors.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
