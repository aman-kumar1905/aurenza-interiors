import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollY } from '../hooks/useScrollY'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = scrollY > 40

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') closeMenu()
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-400 ${
        scrolled ? 'bg-ivory/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-5"
        onKeyDown={handleKeyDown}
      >
        <a href="#top" className="font-serif text-xl tracking-wide text-charcoal">
          AURENZA
        </a>

        <ul className="hidden md:flex items-center gap-10 font-sans text-sm tracking-wide text-charcoal">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-block border border-charcoal px-5 py-2 text-sm tracking-wide text-charcoal hover:bg-charcoal hover:text-ivory transition-colors duration-300"
        >
          Book a Consultation
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden text-charcoal"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <ul className="md:hidden bg-ivory px-6 pb-6 flex flex-col gap-4 font-sans text-base text-charcoal">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-block border border-charcoal px-5 py-2 text-sm"
            >
              Book a Consultation
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
