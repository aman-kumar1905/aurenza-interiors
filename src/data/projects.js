import modernResidence from '../assets/images/projects/modern-residence.jpg'
import earthForm from '../assets/images/projects/earth-form.jpg'
import earthFormDetail from '../assets/images/projects/earth-form-detail.jpg'
import quietVilla from '../assets/images/projects/quiet-villa.jpg'
import urbanExecutive from '../assets/images/projects/urban-executive.jpg'
import urbanExecutiveDetail from '../assets/images/projects/urban-executive-detail.jpg'

// Demo/concept projects — not claimed real client work. Replace with real
// project photography and names when available.
export const projects = [
  {
    id: 'modern-residence',
    title: 'The Modern Residence',
    category: 'Contemporary Residential',
    image: modernResidence,
    secondaryImage: null,
    layout: 'wide',
  },
  {
    id: 'earth-form',
    title: 'Earth & Form',
    category: 'Luxury Apartment',
    image: earthForm,
    secondaryImage: earthFormDetail,
    layout: 'split',
  },
  {
    id: 'quiet-villa',
    title: 'The Quiet Villa',
    category: 'Contemporary Villa',
    image: quietVilla,
    secondaryImage: null,
    layout: 'tall',
  },
  {
    id: 'urban-executive',
    title: 'Urban Executive',
    category: 'Commercial Interior',
    image: urbanExecutive,
    secondaryImage: urbanExecutiveDetail,
    layout: 'split',
  },
]
