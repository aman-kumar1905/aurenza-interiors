import { useInView } from '../hooks/useInView'
import stone from '../assets/images/materials/stone.jpg'
import wood from '../assets/images/materials/wood.jpg'
import fabric from '../assets/images/materials/fabric.jpg'
import metal from '../assets/images/materials/metal.jpg'
import lighting from '../assets/images/materials/lighting.jpg'
import texture from '../assets/images/materials/texture.jpg'

const materials = [
  { id: 'stone', label: 'Stone', image: stone },
  { id: 'wood', label: 'Wood', image: wood },
  { id: 'fabric', label: 'Fabric', image: fabric },
  { id: 'metal', label: 'Metal', image: metal },
  { id: 'lighting', label: 'Lighting', image: lighting },
  { id: 'texture', label: 'Texture', image: texture },
]

export default function Materials() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-sand py-24 md:py-32 px-6 md:px-12">
      <div className={`max-w-7xl mx-auto reveal ${isInView ? 'is-visible' : ''}`} ref={ref}>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-16">
          Details Make the Space.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {materials.map((material) => (
            <div key={material.id} className="group relative aspect-square overflow-hidden">
              <img
                src={material.image}
                alt={`${material.label} material close-up`}
                width={800}
                height={800}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 text-ivory font-sans text-sm tracking-wide uppercase">
                {material.label}
              </span>
              <div className="absolute inset-0 bg-charcoal/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
