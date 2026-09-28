import { Instagram, Mail, MapPin, Phone } from 'lucide-react'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-2">AURENZA INTERIORS</p>
          <p className="font-sans text-sm text-ivory/60">Interior Architecture &amp; Design</p>
        </div>

        <nav>
          <ul className="flex flex-col gap-3 font-sans text-sm text-ivory/70">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-ivory transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 font-sans text-sm text-ivory/70">
          <span className="flex items-center gap-2">
            <Phone size={16} /> +91 00000 00000
          </span>
          <span className="flex items-center gap-2">
            <Mail size={16} /> hello@aurenzainteriors.com
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Ranchi, Jharkhand, India
          </span>
          <a
            href="https://instagram.com"
            className="flex items-center gap-2 hover:text-ivory transition-colors duration-300"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>

      <p className="max-w-7xl mx-auto mt-12 pt-8 border-t border-ivory/10 font-sans text-xs text-ivory/40">
        &copy; 2026 AURENZA INTERIORS. Demo presentation site — content and
        photography are placeholders.
      </p>
    </footer>
  )
}
