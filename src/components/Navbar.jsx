import { useRef, useState } from 'react'
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
  const toggleRef = useRef(null)
  const solid = scrollY > 40 || menuOpen
  const textTone = solid ? 'text-charcoal' : 'text-ivory'
  const borderTone = solid ? 'border-charcoal' : 'border-ivory'

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' && menuOpen) {
      closeMenu()
      toggleRef.current?.focus()
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-400 ${
        solid ? 'bg-ivory/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      onKeyDown={handleKeyDown}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#top" className={`font-serif text-xl tracking-wide ${textTone}`}>
          AURENZA
        </a>

        <ul className={`hidden md:flex items-center gap-10 font-sans text-sm tracking-wide ${textTone}`}>
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
          className={`hidden md:inline-block border ${borderTone} ${textTone} px-5 py-2 text-sm tracking-wide hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-colors duration-300`}
        >
          Book a Consultation
        </a>

        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className={`md:hidden ${textTone}`}
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
